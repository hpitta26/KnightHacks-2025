import { useState, useRef, useEffect } from 'react';
import { HiSparkles } from 'react-icons/hi';
import { FaCircleArrowUp } from 'react-icons/fa6';

function AgentBar() {
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
    <aside className="w-75 bg-white dark:bg-[#141414] border-l border-gray-200 dark:border-[#38393c] h-full flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-[#38393c]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#28ce78] to-[#1ea560] rounded-xl flex items-center justify-center">
            <HiSparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Financial Advisor</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 ${
                message.role === 'user'
                  ? 'bg-[#28ce78] text-white'
                  : 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white border border-gray-200 dark:border-[#38393c]'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-1.5 ${
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
            <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-gray-200 dark:border-[#38393c]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-5 pb-3">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="w-full text-left text-sm p-2.5 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#38393c] transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-4">
        <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#38393c] rounded-2xl px-3 py-2 focus-within:ring-1 focus-within:ring-[#28ce78] focus-within:border-[#28ce78] transition-all flex items-center gap-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 resize-none bg-transparent text-sm focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white leading-5 py-0.5"
            rows="1"
            style={{ 
              maxHeight: '120px', 
              minHeight: '24px',
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
            <FaCircleArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AgentBar;

