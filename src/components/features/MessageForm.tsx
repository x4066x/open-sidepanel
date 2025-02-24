import React, { useState } from 'react';
import { sendMessage } from '../../modules/services/messageService';

interface MessageFormProps {
  onMessageSent: (content: string) => void;
  onResponse?: (content: string) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onMessageSent, onResponse }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await sendMessage({
        type: 'SEND_MESSAGE',
        content: message.trim(),
      });

      if (response.success) {
        onMessageSent(message);
        setMessage('');
        if (onResponse && response.data) {
          // レスポンスの文字列を抽出
          const responseText = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
          onResponse(responseText);
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
