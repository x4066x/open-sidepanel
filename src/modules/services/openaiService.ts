import { createChatCompletion } from '../providers/openai';
import { Message, MessageResponse } from '../types/message';

/**
 * OpenAI APIを使用してメッセージを処理するサービス
 * @param message 処理するメッセージ
 * @returns メッセージレスポンス
 */
export async function processMessage(message: Message): Promise<MessageResponse> {
  try {
    const response = await createChatCompletion({
      content: message.content,
    });

    return {
      success: true,
      data: response.content,
    };
  } catch (error) {
    console.error('Error in OpenAI service:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get AI response',
    };
  }
}
