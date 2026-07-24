'use client';

import React from 'react';
import { ChatMessage } from '../types';
import { Bot, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { user } = useAuth();
  const isUser = message.sender === 'user';

  // Format message string with simple line breaks and markdown bold formatting
  const renderFormattedContent = (content: string) => {
    return content.split('\n').map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return (
        <React.Fragment key={lIdx}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={pIdx}>{part.slice(1, -1)}</em>;
            }
            return part;
          })}
          {lIdx < content.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className={`flex items-start gap-3 animate-in fade-in duration-200 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
          isUser
            ? 'bg-primary text-primary-foreground border-primary/30'
            : 'bg-primary/10 text-primary border-primary/20'
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Bubble Container */}
      <div className={`max-w-[85%] md:max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-tr-sm font-medium'
              : 'bg-card border border-border/60 text-card-foreground rounded-tl-sm'
          }`}
        >
          {renderFormattedContent(message.content)}
        </div>

        {/* Timestamp */}
        <div
          className={`text-[10px] text-muted-foreground px-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};
