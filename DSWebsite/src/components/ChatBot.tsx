import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { from: "user", text: inputValue.trim() }]);
      setInputValue("");
      // Simulate a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: "bot", text: "This is a simulated response." },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 z-[9999]">
        <motion.button
          onClick={toggleChat}
          className="bg-white text-zinc-900 rounded-full w-16 h-16 flex items-center justify-center shadow-lg focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={isOpen ? "x" : "message"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}>
              {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-28 right-8 w-80 h-[450px] bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl flex flex-col z-[9998]">
            <div className="p-4 border-b border-zinc-700">
              <h3 className="font-semibold text-white">Support Chat</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-3 ${
                    msg.from === "bot" ? "justify-start" : "justify-end"
                  }`}>
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[80%] ${
                      msg.from === "bot"
                        ? "bg-zinc-700 text-white"
                        : "bg-blue-600 text-white"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-zinc-700 flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-zinc-800 border border-zinc-600 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none">
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
