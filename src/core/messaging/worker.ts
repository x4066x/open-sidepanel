import { MessageRequest, MessageResponse, Message } from '../../types/messaging';

// TODO: Replace with actual API configuration
const API_CONFIG = {
  endpoint: 'https://api.example.com/chat',
  headers: {
    'Content-Type': 'application/json',
  },
};

class MessageHandler {
  private async sendToAPI(content: string): Promise<string> {
    // TODO: Implement actual API call
    // This is a temporary mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Response to: ${content}`;
  }

  async handleMessage(request: MessageRequest): Promise<MessageResponse> {
    try {
      const response = await this.sendToAPI(request.payload.content);
      
      const message: Message = {
        id: Date.now().toString(),
        content: response,
        timestamp: Date.now(),
        type: 'assistant',
      };

      return {
        type: 'MESSAGE_RESPONSE',
        payload: message,
      };
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }
}

const messageHandler = new MessageHandler();

// Listen for messages from the frontend
chrome.runtime.onMessage.addListener((message: MessageRequest, sender, sendResponse) => {
  if (message.type === 'SEND_MESSAGE') {
    messageHandler.handleMessage(message)
      .then(response => sendResponse(response))
      .catch(error => {
        console.error('Error handling message:', error);
        sendResponse({ error: 'Failed to process message' });
      });
    return true; // Indicates async response
  }
  return false;
});
