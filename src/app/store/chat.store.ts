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
    isLoading: boolean;
    error: string | null;
  }
  
  const initialState: ChatState = {
    chats: [],
    isLoading: false,
    error: null,
  };
  
  export const ChatStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
  
    withComputed((store) => ({
        pinnedChats: computed(() => store.chats().filter((c) => c.pinned)),
        recentChats: computed(() => store.chats().filter((c) => !c.pinned)),
        hasChats: computed(() => store.chats().length > 0),
        allChats: computed(() => store.chats()), 
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
                error: 'Fehler beim Laden der Chats.',
              }),
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
        patchState(store, {
          chats: store.chats().filter((chat) => chat.id !== id),
        });
      },
  
      retry() {
        this.loadChats();
      },
    }))
  );