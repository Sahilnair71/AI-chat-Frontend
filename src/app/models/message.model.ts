export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    chatId: string;
  }
  
  export interface ChatMessages {
    chatId: string;
    messages: Message[];
  }