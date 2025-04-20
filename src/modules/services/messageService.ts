import { browser } from 'wxt/browser';

interface MessageRequest {
  type: string;
  content: string;
  sessionId: string;
  messages?: Array<{
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
  }>;
}

interface MessageResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

/**
 * Sends a message to the background script and returns the response
 * @param message Message request object containing type and content
 * @returns Promise resolving to the message response
 */
export const sendMessage = async (message: MessageRequest): Promise<MessageResponse> => {
  try {
    // セッションの全メッセージを取得
    const sessionMessages = await browser.storage.local.get(message.sessionId);
    const messages = sessionMessages[message.sessionId] || [];

    // 新しいユーザーメッセージを作成
    const userMessage = {
      content: message.content,
      role: 'user' as const,
      timestamp: Date.now()
    };

    // メッセージを送信
    const response = await browser.runtime.sendMessage({
      ...message,
      messages: [...messages, userMessage]
    });

    if (!response) {
      throw new Error('No response from background script');
    }

    // アシスタントの応答を作成
    const assistantMessage = {
      content: typeof response === 'string' ? response : JSON.stringify(response),
      role: 'assistant' as const,
      timestamp: Date.now()
    };

    // メッセージを保存
    const updatedMessages = [...messages, userMessage, assistantMessage];
    await browser.storage.local.set({
      [message.sessionId]: updatedMessages
    });

    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
