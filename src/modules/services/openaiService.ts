import { createChatCompletion } from '../providers/openai';
import { Message, MessageResponse } from '../types/message';

interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

/**
 * OpenAI APIを使用してメッセージを処理するサービス
 * @param message 処理するメッセージ
 * @returns メッセージレスポンス
 */
export async function processMessage(message: Message & { messages?: ChatMessage[] }): Promise<MessageResponse> {
  try {
    // システムメッセージを追加
    const systemMessage = {
      role: 'system' as const,
      content: 'あなたはチャットアシスタントです。会話の文脈を理解し、過去のメッセージを参照して適切に応答してください。'
    };

    // 過去のメッセージをコンテキストとして使用
    const context = message.messages?.map(msg => ({
      content: msg.content,
      role: msg.role
    })) || [];

    // 新しいメッセージを追加
    const userMessage = {
      content: message.content,
      role: 'user' as const
    };

    // 全てのメッセージを結合
    const allMessages = [systemMessage, ...context, userMessage];

    console.log('Sending messages to OpenAI:', allMessages);

    const response = await createChatCompletion({
      content: message.content,
      context: allMessages
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
