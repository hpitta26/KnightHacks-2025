import { useState, useRef, useEffect } from 'react';
import { HiSparkles } from 'react-icons/hi';
import { FaCircleArrowUp } from 'react-icons/fa6';

function FloatingChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi! I\'m your financial advisor. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'I\'m currently in demo mode. In production, I would analyze your portfolio and provide personalized financial advice based on your query.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setTimeout(adjustTextareaHeight, 0);
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const suggestedQuestions = [
    "What's my net worth?",
    "Analyze my spending",
    "Investment suggestions",
    "Budget recommendations"
  ];

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#38393c] rounded-2xl flex flex-col h-full">
      {/* Header */}
      <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-[#28ce78] to-[#1ea560] rounded-lg flex items-center justify-center">
            <HiSparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Financial Advisor</h2>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-2.5 text-xs ${
                message.role === 'user'
                  ? 'bg-[#28ce78] text-white'
                  : 'bg-gray-100 dark:bg-[#141414] text-gray-900 dark:text-white border border-gray-200 dark:border-[#38393c]'
              }`}
            >
              <p className="leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.role === 'user' 
                  ? 'text-white/70' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-xl p-2.5 border border-gray-200 dark:border-[#38393c]">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-3 pb-2">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
          <div className="space-y-1">
            {suggestedQuestions.slice(0, 2).map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="w-full text-left text-xs p-2 rounded-lg bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#38393c] transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 border-t border-gray-200 dark:border-[#38393c]">
        <div className="bg-gray-50 dark:bg-[#141414] border border-gray-300 dark:border-[#38393c] rounded-xl px-2 py-1.5 focus-within:ring-1 focus-within:ring-[#28ce78] focus-within:border-[#28ce78] transition-all flex items-center gap-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 resize-none bg-transparent text-xs focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white leading-4 py-0.5"
            rows="1"
            style={{ 
              maxHeight: '80px', 
              minHeight: '16px',
              overflowY: 'auto'
            }}
          />
          
          {/* Send Button */}           
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className={`p-1 transition-colors rounded-lg disabled:cursor-not-allowed shrink-0 ${
              !(!inputValue.trim() || isTyping) 
                ? 'text-[#28ce78] hover:text-[#1ea560] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] cursor-pointer' 
                : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            <FaCircleArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloatingChat;
