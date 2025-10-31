
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (input: string) => void;
  isLoading: boolean;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent);
    }
  };


  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading || !input.trim()}
        >
          <SendIcon/>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
