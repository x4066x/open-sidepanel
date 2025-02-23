export interface Message {
  id: string;
  content: string;
  timestamp: number;
  type: 'user' | 'assistant';
}

export interface MessageRequest {
  type: 'SEND_MESSAGE';
  payload: {
    content: string;
  };
}

export interface MessageResponse {
  type: 'MESSAGE_RESPONSE';
  payload: Message;
}

export type WorkerMessage = MessageRequest | MessageResponse;
