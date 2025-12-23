/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import GlassSurface from './GlassSurface';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to NATURE MAGIC. I am here to help you find objects that resonate with your life. How may I assist?', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text);
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[210] flex flex-col items-end font-sans">
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[580px] mb-6 animate-fade-in-up">
          <GlassSurface borderRadius={40} backgroundOpacity={0.12} className="shadow-2xl h-full border border-white/30">
            {/* Header */}
            <div className="p-6 border-b border-white/20 flex justify-between items-center bg-white/20">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#3A4D39] rounded-full animate-pulse shadow-[0_0_10px_rgba(58,77,57,0.5)]"></div>
                    <span className="font-serif italic text-[#2C2A26] text-xl">Concierge</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-[#5D5A53] hover:text-[#2C2A26] transition-colors p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth no-scrollbar" ref={scrollRef}>
                {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#2C2A26] text-[#F5F2EB] rounded-3xl rounded-tr-none' : 'bg-white/60 border border-white/40 text-[#2C2A26] rounded-3xl rounded-tl-none font-medium backdrop-blur-sm'}`}>
                    {msg.text}
                    </div>
                </div>
                ))}
                {isThinking && (
                <div className="flex justify-start">
                    <div className="bg-white/40 border border-white/20 p-4 flex gap-1.5 items-center rounded-3xl rounded-tl-none">
                        <div className="w-1 h-1 bg-[#3A4D39] rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-[#3A4D39] rounded-full animate-bounce delay-75"></div>
                        <div className="w-1 h-1 bg-[#3A4D39] rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white/20 border-t border-white/10">
                <div className="flex gap-3 relative">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask our experts..." 
                    className="flex-1 bg-white/50 border border-white/40 focus:border-[#2C2A26]/30 px-5 py-3.5 text-xs outline-none transition-all placeholder-[#A8A29E] text-[#2C2A26] rounded-full"
                />
                <button 
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isThinking}
                    className="bg-[#2C2A26] text-[#F5F2EB] w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 active:scale-90 transition-all disabled:opacity-50 shadow-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
                </div>
            </div>
          </GlassSurface>
        </div>
      )}

      {/* Floating Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 relative group"
      >
        <GlassSurface borderRadius={170} backgroundOpacity={isOpen ? 0.9 : 0.4} className={`w-full h-full shadow-2xl transition-all duration-500 overflow-hidden ${isOpen ? 'scale-90 !bg-[#2C2A26]' : 'hover:scale-110'}`}>
            <div className="flex items-center justify-center w-full h-full">
            {isOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white relative z-10"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            ) : (
                <div className="flex flex-col items-center gap-0.5 relative z-10 group-hover:scale-110 transition-transform">
                    <div className="w-6 h-0.5 bg-[#2C2A26] rounded-full"></div>
                    <div className="w-4 h-0.5 bg-[#2C2A26] rounded-full ml-auto"></div>
                    <span className="font-serif italic text-sm text-[#2C2A26] font-black">Ai</span>
                </div>
            )}
            </div>
        </GlassSurface>
      </button>
    </div>
  );
};

export default Assistant;