
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { Chat } from '@google/genai';
import { Message } from './types';
import { SYSTEM_INSTRUCTION, INITIAL_BOT_MESSAGE } from './constants';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_BOT_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
      } catch (error) {
        console.error("Failed to initialize Gemini AI:", error);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "Error: Could not initialize the AI chat. Please check the API key and refresh the page.",
          sender: 'bot'
        }]);
      }
    };
    initChat();
  }, []);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessage({ message: inputText });
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: result.text,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white shadow-2xl rounded-lg">
      <Header />
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-black rounded-lg p-3 max-w-lg animate-pulse">
              Bot is thinking...
            </div>
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
