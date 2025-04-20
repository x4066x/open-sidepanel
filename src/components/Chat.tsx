import React, { useEffect, useState } from 'react';
import { MessageForm } from './features/MessageForm';
import { ChatMessage, ChatSession } from '../modules/types/message';
import { AVAILABLE_PROVIDERS } from '../modules/types/provider';
import { ProviderKeyForm } from './features/ProviderKeyForm';

export const Chat: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState(AVAILABLE_PROVIDERS[0]);

  useEffect(() => {
    // Load sessions from storage on component mount
    const loadSessions = async () => {
      const storedSessions = await localStorage.getItem('chatSessions');
      if (storedSessions) {
        const parsedSessions = JSON.parse(storedSessions);
        setSessions(parsedSessions);
        if (parsedSessions.length > 0) {
          setCurrentSessionId(parsedSessions[parsedSessions.length - 1].id);
        } else {
          createNewSession();
        }
      } else {
        createNewSession();
      }
    };
    loadSessions();
  }, []);

  useEffect(() => {
    // Save sessions to storage whenever they change
    if (sessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  // ユニークなIDを生成する関数
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: generateUniqueId(),
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
  };

  const getCurrentSession = () => {
    return sessions.find(session => session.id === currentSessionId);
  };

  const updateSession = (sessionId: string, messages: ChatMessage[]) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          messages,
          updatedAt: Date.now(),
        };
      }
      return session;
    }));
  };

  const handleMessageSent = (content: string) => {
    const currentSession = getCurrentSession();
    if (!currentSession) return;

    // ユーザーメッセージを追加
    const userMessage: ChatMessage = {
      id: generateUniqueId(),
      content,
      role: 'user',
      timestamp: Date.now(),
      sessionId: currentSession.id,
    };

    setSessions(prev => prev.map(session => {
      if (session.id === currentSession.id) {
        return {
          ...session,
          messages: [...session.messages, userMessage],
          updatedAt: Date.now(),
        };
      }
      return session;
    }));
  };

  const handleResponse = (content: string) => {
    const currentSession = getCurrentSession();
    if (!currentSession) return;

    // アシスタントメッセージを追加
    const assistantMessage: ChatMessage = {
      id: generateUniqueId(),
      content,
      role: 'assistant',
      timestamp: Date.now(),
      sessionId: currentSession.id,
    };

    setSessions(prev => prev.map(session => {
      if (session.id === currentSession.id) {
        return {
          ...session,
          messages: [...session.messages, assistantMessage],
          updatedAt: Date.now(),
        };
      }
      return session;
    }));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={createNewSession}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            New Chat
          </button>
          <div className="flex items-center space-x-4">
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
        <div className="flex space-x-2 overflow-x-auto py-2">
          {sessions.map(session => (
            <button
              key={session.id}
              onClick={() => setCurrentSessionId(session.id)}
              className={`px-3 py-1 rounded whitespace-nowrap ${session.id === currentSessionId ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Chat {new Date(session.createdAt).toLocaleString()}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {getCurrentSession()?.messages.map((message) => (
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
      <MessageForm 
        onMessageSent={handleMessageSent} 
        onResponse={handleResponse} 
        currentSession={getCurrentSession()} 
      />
    </div>
  );
};
