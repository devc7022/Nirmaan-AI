'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChatMessage } from '@/features/ai/types';
import { useAIChat } from '@/features/ai/hooks/useAIChat';
import { ChatBubble } from '@/features/ai/components/ChatBubble';
import { TypingIndicator } from '@/features/ai/components/TypingIndicator';
import { PromptSuggestions } from '@/features/ai/components/PromptSuggestions';
import { Bot, Send, AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface AIChatProps {
  onShowToast?: (message: string, type: 'success' | 'error') => void;
}

const DEFAULT_SUGGESTIONS = [
  'How many workers are absent today?',
  'Which site has the highest attendance?',
  "How much is today's labour cost?",
  'Show all electricians.',
];

export const AIChat: React.FC<AIChatProps> = ({ onShowToast }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      content:
        'Hello! I am your **Nirmaan AI Workforce Assistant**. How can I help you manage your construction sites and workers today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending, isError, error, reset } = useAIChat();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPending]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isPending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    reset();

    sendMessage(
      { message: query.trim(), history: messages },
      {
        onSuccess: (data) => {
          const aiMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            content: data.reply,
            timestamp:
              data.timestamp ||
              new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          setMessages((prev) => [...prev, aiMsg]);
          if (data.suggestions && data.suggestions.length > 0) {
            setSuggestions(data.suggestions);
          }

          if (onShowToast) {
            onShowToast('Message Sent', 'success');
          }
        },
        onError: (err) => {
          if (onShowToast) {
            onShowToast(err.message || 'Failed to get response from AI Assistant.', 'error');
          }
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'ai',
        content:
          'Chat history reset. How can I assist you with your construction sites?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setSuggestions(DEFAULT_SUGGESTIONS);
  };

  return (
    <Card className="border-border/60 bg-card/50 backdrop-blur shadow-md flex flex-col h-[700px]">
      {/* Header */}
      <CardHeader className="pb-3 border-b border-border/50 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                AI Assistant
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </CardTitle>
              <CardDescription>
                Ask real-time queries about workers, site progress, attendance, and costs.
              </CardDescription>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            className="text-xs text-muted-foreground hover:text-destructive gap-1.5"
            title="Clear Chat History"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </CardHeader>

      {/* Messages Scroll Area */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {isPending && <TypingIndicator />}

        {isError && (
          <Alert variant="destructive" className="animate-in fade-in duration-200 text-xs">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error?.message || 'Failed to connect to AI Assistant.'}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSend(messages[messages.length - 1]?.content)}
                className="ml-2 gap-1 text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      {/* Footer & Input Controls */}
      <CardFooter className="flex flex-col gap-3 p-4 border-t border-border/50 bg-background/40 shrink-0">
        {/* Quick Suggestions */}
        <PromptSuggestions
          suggestions={suggestions}
          onSelectSuggestion={(prompt) => handleSend(prompt)}
          disabled={isPending}
        />

        {/* Input box & send button */}
        <div className="flex items-end gap-2 w-full pt-1">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            rows={2}
            className="resize-none font-medium text-sm focus-visible:ring-primary min-h-[44px]"
            disabled={isPending}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isPending}
            className="h-[44px] px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
