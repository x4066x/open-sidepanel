import { Message, MessageResponse } from '../../types/message';

/**
 * Sends a message to the background script and returns the response
 * @param message The message to send
 * @returns Promise resolving to the message response
 */
export const sendMessage = async (message: Message): Promise<MessageResponse> => {
  try {
    const response = await chrome.runtime.sendMessage(message);
    // レスポンスが既にMessageResponse形式の場合はそのまま返す
    if (response && typeof response === 'object' && 'success' in response) {
      return response as MessageResponse;
    }
    // それ以外の場合はラップして返す
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Message handler for receiving messages from the background script
 * @param callback Function to handle incoming messages
 */
export const setupMessageListener = (
  callback: (response: MessageResponse) => void
) => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    callback({
      success: true,
      data: message,
    });
    return true; // Keep the message channel open for async response
  });
};
