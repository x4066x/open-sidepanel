import OpenAI from 'openai';

// OpenAIクライアントのインスタンスを作成
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // dangerouslyAllowBrowser: true // ブラウザでの使用を許可（開発用）
});

export interface ChatCompletionRequest {
  content: string;
  context?: Array<{
    content: string;
    role: 'system' | 'user' | 'assistant';
  }>;
}

export interface ChatCompletionResponse {
  content: string;
}

/**
 * OpenAI APIを使用してチャット応答を生成する
 * @param request チャットリクエスト
 * @returns チャット応答
 */
export async function createChatCompletion(
  request: ChatCompletionRequest
): Promise<ChatCompletionResponse> {
  const messages = request.context || [];

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.7,
  });

  console.log('OpenAI response:', completion.choices[0]?.message);

  const response = completion.choices[0]?.message?.content;

  if (!response) {
    throw new Error('No response from OpenAI');
  }

  return {
    content: response,
  };
}
