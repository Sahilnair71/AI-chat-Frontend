import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
    
  } from '@ngrx/signals';
  import { inject,computed } from '@angular/core';
  import { finalize } from 'rxjs';
  import { ChatSummary } from '../models/chat-summary.model';
  import { ChatService } from '../services/chat.service';
  
  interface ChatState {
    chats: ChatSummary[];
    activeChatId: string | null;
    isLoading: boolean;
    error: string | null;
    autoSaveEnabled: boolean; 
    newChatRequested: number;
  }
  
  const initialState: ChatState = {
    chats: [],
    activeChatId: null,
    isLoading: false,
    error: null,
    autoSaveEnabled: true,
    newChatRequested: 0
  };
  
  export const ChatStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
  
    withComputed((store) => ({
      pinnedChats: computed(() => store.chats().filter((c) => c.pinned)),
      recentChats: computed(() => store.chats().filter((c) => !c.pinned)),
      hasChats: computed(() => store.chats().length > 0),
      allChats: computed(() => store.chats()),
      activeChat: computed(() => {
        const id = store.activeChatId();
        if (!id) return null;
        return store.chats().find(c => c.id === id) || null;
      }),
      // activeChatId: computed(() => store.activeChatId()),
      // autoSaveEnabled: computed(() => store.autoSaveEnabled()),
    })),
  
    withMethods((store, api = inject(ChatService)) => ({
      loadChats() {
        if (store.isLoading()) return;
  
        patchState(store, { isLoading: true, error: null });
  
        api
          .getChats()
          .pipe(finalize(() => patchState(store, { isLoading: false })))
          .subscribe({
            next: (list) => patchState(store, { chats: list }),
            error: () =>
              patchState(store, {
                error: 'Error loading chats',
              }),
          });
      },
      setActiveChat(id: string | null) {
        patchState(store, { activeChatId: id });
      },
      setAutoSave(enabled: boolean) {
        patchState(store, { autoSaveEnabled: enabled });
      },
      requestNewChat() {
        // Increment counter to trigger effects even when activeChatId is already null
        patchState(store, { 
          activeChatId: null,
          newChatRequested: store.newChatRequested() + 1 
        });
      },

      addChat(chat: ChatSummary) {
        patchState(store, {
          chats: [chat, ...store.chats()],
          activeChatId: chat.id,
        });
      },
      
      updateChatModel(chatId: string, model: string, provider: string) {
        patchState(store, {
          chats: store.chats().map((chat) =>
            chat.id === chatId ? { ...chat, model, provider } : chat
          ),
        });
      },

      updateChatProduct(chatId: string, product: string) {
        patchState(store, {
          chats: store.chats().map((chat) =>
            chat.id === chatId ? { ...chat, product } : chat
          ),
        });
      },

      renameChat(id: string, title: string) {
        patchState(store, {
          chats: store.chats().map((chat) =>
            chat.id === id ? { ...chat, title } : chat
          ),
        });
      },
  
      deleteChat(id: string) {
        const chats = store.chats().filter((chat) => chat.id !== id);
        const activeId = store.activeChatId();
        
        patchState(store, {
          chats,
          activeChatId: activeId === id ? (chats.length > 0 ? chats[0].id : null) : activeId,
        });
      },
  
      retry() {
        this.loadChats();
      },
    }))
  );