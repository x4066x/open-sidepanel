import { useState, FormEvent } from 'react'
import './App.css'
import { Message, MessageRequest, MessageResponse } from '../types/messaging'

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      timestamp: Date.now(),
      type: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const request: MessageRequest = {
        type: 'SEND_MESSAGE',
        payload: {
          content: inputMessage
        }
      };

      const response = await chrome.runtime.sendMessage(request) as MessageResponse;
      if ('error' in response) {
        throw new Error(response.error);
      }
      
      setMessages(prev => [...prev, response.payload]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="message loading">
            <span>...</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          rows={3}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default App
