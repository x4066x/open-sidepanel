import React, { useEffect, useState } from 'react';
import { MessageForm } from '../components/features/MessageForm';
import { setupMessageListener } from '../core/services/messageHandler';
import { ChatMessage } from '../types/message';
import { AVAILABLE_PROVIDERS } from '../types/provider';
import { ProviderKeyForm } from '../components/features/ProviderKeyForm';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(AVAILABLE_PROVIDERS[0]);

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
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4 mb-4">
          <select
            value={selectedProvider.id}
            onChange={(e) => setSelectedProvider(
              AVAILABLE_PROVIDERS.find(p => p.id === e.target.value) || AVAILABLE_PROVIDERS[0]
            )}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {AVAILABLE_PROVIDERS.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
          {selectedProvider.requiresKey && (
            <div className="flex-1">
              <ProviderKeyForm
                providerId={selectedProvider.id}
                providerName={selectedProvider.name}
              />
            </div>
          )}
        </div>
      </div>
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
