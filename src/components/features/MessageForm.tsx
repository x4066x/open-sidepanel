import React, { useState } from 'react';
import { sendMessage } from '../../modules/services/messageService';
import { ChatSession } from '../../modules/types/message';

interface MessageFormProps {
  onMessageSent: (content: string) => void;
  onResponse?: (content: string) => void;
  currentSession?: ChatSession;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onMessageSent, onResponse, currentSession }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      if (!currentSession) {
        throw new Error('No active chat session');
      }

      // まずユーザーメッセージを表示
      onMessageSent(message.trim());

      // メッセージを送信
      const response = await sendMessage({
        type: 'SEND_MESSAGE',
        content: message.trim(),
        sessionId: currentSession.id,
      });

      setMessage('');

      // レスポンスの処理
      if (response.success && onResponse && response.data) {
        const responseData = response.data;
        if (typeof responseData === 'string') {
          try {
            // JSON文字列の場合はパースを試みる
            const parsed = JSON.parse(responseData);
            if ('success' in parsed && 'data' in parsed) {
              onResponse(parsed.data);
            } else {
              onResponse(parsed);
            }
          } catch {
            // パースに失敗した場合はそのまま使用
            onResponse(responseData);
          }
        } else if (responseData && typeof responseData === 'object') {
          // オブジェクトの場合
          onResponse('data' in responseData ? responseData.data : JSON.stringify(responseData));
        }
      } else {
        console.error('Failed to send message:', response.error);
      }
    } catch (error) {
      console.error('Error in message submission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className={`px-4 py-2 rounded-lg text-white ${
          isLoading || !message.trim()
            ? 'bg-gray-400'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};
