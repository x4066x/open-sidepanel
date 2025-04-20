export interface Message {
  type: 'SEND_MESSAGE';
  content: string;
  sessionId: string;
}

export interface MessageResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  sessionId: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}
