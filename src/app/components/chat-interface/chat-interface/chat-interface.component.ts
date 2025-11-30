import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChatStore } from '../../../store/chat.store';
import { ReplyMockApiService } from '../../../services/reply-mock-api.service';
import { MessageService } from '../../../services/message.service'
import { ChatSummary } from '../../../models/chat-summary.model';
import { Message } from '../../../models/message.model';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { AnswerCardComponent } from '../answer-card/answer-card.component';
import { ChatInputComponent } from '../chat-input.component/chat-input.component.component';
import { ModelSelectorComponent } from '../model-selector/model-selector.component';

@Component({
  selector: 'app-chat-interface',
  imports: [  MatIconModule,
    MatButtonModule,
    QuestionCardComponent,
    AnswerCardComponent,
    CommonModule,
    ChatInputComponent,ModelSelectorComponent],
  templateUrl: './chat-interface.component.html',
  styleUrl: './chat-interface.component.scss'
})
export class ChatInterfaceComponent {

  private readonly chatStore = inject(ChatStore);
  private readonly mockApi = inject(ReplyMockApiService);
  private readonly messageService = inject(MessageService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);
  isStreaming = signal(false);
  isLoadingMessages = signal(false);
  selectedProduct = signal<string>('All Products');
  private isCreatingNewChat = false;

  constructor() {
    // React to active chat changes - but skip if we're creating a new chat
    effect(() => {
      const activeChat = this.chatStore.activeChat();
      if (activeChat && !this.isCreatingNewChat) {
        // Only load messages if we're switching to an existing chat
        // Don't reload if we just created this chat
        const currentChatId = activeChat.id;
        const currentMessages = this.messages();
        
        // Only load if messages don't belong to this chat or are empty
        if (currentMessages.length === 0 || currentMessages[0]?.chatId !== currentChatId) {
          this.loadMessagesForChat(currentChatId);
        }
      } else if (!activeChat && !this.isCreatingNewChat) {
        this.messages.set([]);
        this.selectedProduct.set('All Products'); 
      }
    });
  }

  ngOnInit() {
    // If no active chat on init, show empty state
    if (!this.chatStore.activeChat()) {
      this.messages.set([]);
    }
  }

   currentChat() {
    return this.chatStore.activeChat();
  }


  private loadMessagesForChat(chatId: string) {
    this.isLoadingMessages.set(true);
    
    const storedMessages = this.messageService.getStoredMessages(chatId);
    if (storedMessages.length > 0) {
      this.messages.set(storedMessages);
      this.isLoadingMessages.set(false);
      return;
    }

    this.messageService.getMessagesForChat(chatId).subscribe({
      next: (messages) => {
        this.messages.set(messages);
        if (messages.length > 0) {
          localStorage.setItem(`messages_${chatId}`, JSON.stringify(messages));
        }
        this.isLoadingMessages.set(false);
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.messages.set([]);
        this.isLoadingMessages.set(false);
      }
    });
  }


  async onSendMessage(questionText: string) {
    if (!questionText.trim() || this.isLoading()) return;

    let activeChat = this.chatStore.activeChat();
    
    if (!activeChat) {
      await this.createNewChat(questionText);
      activeChat = this.chatStore.activeChat();
      if (!activeChat) return;
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: questionText,
      timestamp: new Date().toISOString(),
      chatId: activeChat.id
    };

    this.messages.update(msgs => [...msgs, userMessage]);
    this.saveMessages(activeChat.id);

    this.isLoading.set(true);
    this.isStreaming.set(true);

    const assistantMessage: Message = {
      id: `msg_${Date.now() + 1}`,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      chatId: activeChat.id
    };

    this.messages.update(msgs => [...msgs, assistantMessage]);

    this.mockApi.streamAnswerSimple(questionText).subscribe({
      next: (content) => {
        this.messages.update(msgs => {
          const updated = [...msgs];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.role === 'assistant') {
            lastMsg.content = content;
          }
          return updated;
        });
      },
      complete: () => {
        this.isLoading.set(false);
        this.isStreaming.set(false);
        this.saveMessages(activeChat!.id);
        this.chatStore.renameChat(activeChat!.id, activeChat!.title);
      },
      error: (error) => {
        console.error('Error streaming answer:', error);
        this.isLoading.set(false);
        this.isStreaming.set(false);
      }
    });
  }

  private saveMessages(chatId: string) {
    const messages = this.messages();
    this.messageService.saveMessages(chatId, messages).subscribe();
  }

  onModelChange(model: string) {
    const chat = this.currentChat();
    if (chat) {
      this.chatStore.updateChatModel(chat.id, model, chat.provider);
    }
    else {
      // If no chat yet, store for when chat is created
      // You might want to add a signal to store pending model/provider
      console.log('Model changed but no active chat yet');
    }
  }

  onProviderChange(provider: string) {
    const chat = this.currentChat();
    if (chat) {
      this.chatStore.updateChatModel(chat.id, chat.model, provider);
    }
  }

  onCreativityChange(creativity: string) {
    console.log('Creativity changed:', creativity);
  }

  

  onFileAttach() {
    // Just a demo - show a message or notification
    console.log('File attachment feature (demo)');
    // You could show a toast/snackbar here if you have one
  }

  onProductChange(product: string) {
    this.selectedProduct.set(product);
    const chat = this.currentChat();
    if (chat) {
      this.chatStore.updateChatProduct(chat.id, product);
    }
  }

  private async createNewChat(question: string) {
    try {
      const title = await this.mockApi.generateTitle().toPromise();
      const { provider, model } = this.mockApi.getRandomProviderAndModel();
      
      const newChat: ChatSummary = {
        id: Date.now().toString(),
        title: title || 'New Chat',
        provider,
        model,
        product: this.selectedProduct(),
        lastUpdated: new Date().toISOString(),
        pinned: false,
      };

      this.chatStore.addChat(newChat);
    } catch (error) {
      console.error('Error creating chat:', error);
      this.isCreatingNewChat=false
    }
  }
  
}
