
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.464 6.023l.13.26a1 1 0 001.732-.866l-.13-.26A2 2 0 1111 9z" clipRule="evenodd" />
    </svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const messageContainerClasses = isUser ? 'flex justify-end items-start gap-3' : 'flex justify-start items-start gap-3';
  const messageBubbleClasses = isUser
    ? 'bg-blue-500 text-white rounded-lg p-3 max-w-lg'
    : 'bg-gray-200 text-gray-800 rounded-lg p-3 max-w-lg';
  
  const iconContainerClasses = isUser
    ? 'bg-blue-500 rounded-full p-1.5'
    : 'bg-gray-200 rounded-full p-1.5';

  return (
    <div className={messageContainerClasses}>
      {!isUser && <div className={iconContainerClasses}><BotIcon/></div>}
      <div className={messageBubbleClasses}>
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && <div className={iconContainerClasses}><UserIcon/></div>}
    </div>
  );
};

export default ChatMessage;
