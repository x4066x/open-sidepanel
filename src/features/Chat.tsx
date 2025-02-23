import React, { useEffect, useState } from 'react';
import { MessageForm } from '../components/features/MessageForm';
import { setupMessageListener } from '../core/services/messageHandler';
import { ChatMessage } from '../types/message';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // ユニークなIDを生成する関数
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleMessageSent = (content: string) => {
    const userMessage: ChatMessage = {
      id: generateUniqueId(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleResponse = (content: string) => {
    const assistantMessage: ChatMessage = {
      id: generateUniqueId(),
      content,
      role: 'assistant',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <MessageForm onMessageSent={handleMessageSent} onResponse={handleResponse} />
    </div>
  );
};
