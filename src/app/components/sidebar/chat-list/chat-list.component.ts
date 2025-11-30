import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ChatItemComponent } from '../chat-item/chat-item.component';
import { ChatStore } from '../../../store/chat.store';
import { ChatSummary } from '../../../models/chat-summary.model';
import { inject } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [NgFor, NgIf, ChatItemComponent],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  public readonly chatStore = inject(ChatStore);

  @Input() searchTerm = '';

  readonly chats = this.chatStore.allChats;
  readonly isLoading = this.chatStore.isLoading;
  readonly error = this.chatStore.error;
  readonly activeChatId = this.chatStore.activeChatId;

  ngOnInit(): void {
    if (!this.chats().length && !this.isLoading()) {
      this.chatStore.loadChats();
    }
  }

  filteredChats(): ChatSummary[] {
    const query = this.searchTerm.trim().toLowerCase();
    if (!query) return this.chats();
    return this.chats().filter((chat: ChatSummary) =>
      typeof chat.title === 'string' &&
      chat.title.toLowerCase().includes(query)
    );
  }

  renameChat(payload: { id: string; title: string }) {
    if (!payload.title) return;
    this.chatStore.renameChat(payload.id, payload.title);
  }

  deleteChat(id: string) {
    this.chatStore.deleteChat(id);
  }
  
  selectChat(id: string) {
    this.chatStore.setActiveChat(id);
  }
}