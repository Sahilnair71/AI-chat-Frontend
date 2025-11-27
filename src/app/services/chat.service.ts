import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ChatSummary } from '../models/chat-summary.model';

interface ChatResponse {
  chats: ChatSummary[];
}

@Injectable({
  providedIn: 'root'
})


export class ChatService {

  private readonly endpoint = 'assets/mock-data/chats.json';

  constructor(private readonly http: HttpClient) {}

  getChats(): Observable<ChatSummary[]> {
    return this.http
      .get<ChatResponse>(this.endpoint)
      .pipe(map((res) => res.chats ?? []));
  }
}
