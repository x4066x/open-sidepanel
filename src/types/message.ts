export interface Message {
  type: 'SEND_MESSAGE';
  content: string;
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
}
