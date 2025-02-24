import { browser } from 'wxt/browser';

interface MessageRequest {
  type: string;
  content: string;
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
    const response = await browser.runtime.sendMessage(message);
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
