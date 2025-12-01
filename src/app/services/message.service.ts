import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Message, ChatMessages } from '../models/message.model';

interface MessagesResponse {
  messages: ChatMessages[];
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly endpoint = 'assets/mock-data/messages.json';

  constructor(private readonly http: HttpClient) {}
  
  getMessagesForChat(chatId: string): Observable<Message[]> {
    return this.http
      .get<MessagesResponse>(this.endpoint)
      .pipe(
        map((res) => {
          const chatMessages = res.messages?.find((cm) => cm.chatId === chatId);
          return chatMessages?.messages || [];
        }),
        delay(300)
      );
  }

  saveMessage(chatId: string, message: Message): Observable<void> {
    const stored = localStorage.getItem(`messages_${chatId}`);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    messages.push(message);
    localStorage.setItem(`messages_${chatId}`, JSON.stringify(messages));
    return of(undefined).pipe(delay(100));
  }

  saveMessages(chatId: string, messages: Message[]): Observable<void> {
    localStorage.setItem(`messages_${chatId}`, JSON.stringify(messages));
    return of(undefined).pipe(delay(100));
  }

  // Get from localStorage (for immediate access)
  getStoredMessages(chatId: string): Message[] {
    const stored = localStorage.getItem(`messages_${chatId}`);
    return stored ? JSON.parse(stored) : [];
  }
}