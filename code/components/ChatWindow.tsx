import React, { useState } from 'react';
import { MOCK_CHAT_MESSAGES, currentUser } from '../constants';
import { ChatMessage } from '../types';

const Message: React.FC<{ chatMessage: ChatMessage }> = ({ chatMessage }) => {
    return (
        <div className="flex items-start space-x-3 py-2">
            <img src={chatMessage.user.avatarUrl} alt={chatMessage.user.name} className="w-8 h-8 rounded-full" />
            <div>
                <p className="font-semibold text-cyan-600 text-sm">{chatMessage.user.name}</p>
                <p className="text-sm text-gray-700">{chatMessage.message}</p>
            </div>
        </div>
    );
};


const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState(MOCK_CHAT_MESSAGES);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            const message: ChatMessage = {
                id: messages.length + 1,
                user: currentUser,
                message: newMessage.trim(),
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-white text-gray-800 rounded-lg p-3 min-h-[350px]">
            <div className="flex-1 overflow-y-auto pr-2">
                {messages.map((msg) => (
                    <Message key={msg.id} chatMessage={msg} />
                ))}
            </div>
            <div className="pt-3 mt-2 border-t border-gray-200">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribir..."
                        className="w-full bg-gray-100 border border-gray-300 rounded-full pl-4 pr-12 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                    <button 
                        onClick={handleSend} 
                        aria-label="Enviar mensaje" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 hover:bg-cyan-600 transition-colors"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;