import React, { useState } from 'react';
import axios from 'axios';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Configure axios to include CSRF token
    axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    axios.defaults.withCredentials = true;

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            text: inputMessage,
            isUser: true,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setInputMessage('');

        try {
            const response = await axios.post('/api/chat/send', {
                message: userMessage.text
            });

            const aiMessage = {
                text: response.data.message,
                isUser: false,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                text: error.response?.data?.message || 'Sorry, there was an error processing your message.',
                isUser: false,
                isError: true,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500">
                        Start a conversation by typing a message below.
                    </div>
                )}
                {messages.map((message) => (
                    <div
                        key={message.timestamp}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                                message.isUser
                                    ? 'bg-blue-500 text-white'
                                    : message.isError
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-900'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3">
                            <div className="animate-pulse">Thinking...</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="border-t p-4">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-lg border border-gray-300 p-2"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputMessage.trim()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
} 