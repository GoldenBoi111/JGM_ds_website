import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi";

interface Message {
  from: "bot" | "user";
  text?: string;
  image?: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hello! How can I help you today?" },
    {
      from: "bot",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [fullScreenImage, setFullScreenImage] = useState<{
    id: string;
    src: string;
  } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent page scroll when scrolling inside the chat window
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const atTop = el.scrollTop === 0;
      const atBottom =
        Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 1;

      // Block scroll from affecting the page if not at the edges
      if (e.deltaY < 0 && !atTop) {
        e.stopPropagation();
      }
      if (e.deltaY > 0 && !atBottom) {
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", handleWheel);
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isOpen]); // Re-attach listener if chat window re-opens

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen && isFullScreen) {
      setIsFullScreen(false);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (userMessage) {
      setMessages([...messages, { from: "user", text: userMessage }]);
      setInputValue("");
      // Simulate a bot response
      setTimeout(() => {
        if (userMessage.toLowerCase() === "image") {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              from: "bot",
              image:
                "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { from: "bot", text: "This is a simulated response." },
          ]);
        }
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

      {/* Chat Window and Full-screen Image Modal */}
      {/* Chat Window */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={toggleFullScreen}
          />
        )}
        {isOpen && (
          <motion.div
            key="chat-window"
            layout
            transition={{
              layout: { duration: 0.3, ease: "easeOut" },
              opacity: { duration: 0.2 },
            }}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className={`fixed bg-zinc-900 border border-zinc-700 shadow-2xl flex flex-col z-[9998] ${
              isFullScreen
                ? "inset-0 m-auto w-[95vw] h-[90vh] max-w-4xl max-h-[800px] rounded-lg z-[9999]"
                : "bottom-28 inset-x-4 h-[65vh] max-h-[600px] rounded-lg sm:w-96 sm:left-auto sm:right-8 sm:bottom-20"
            }`}>
            <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
              <h3 className="font-semibold text-white">JGM Support</h3>
              <button
                onClick={toggleFullScreen}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label={
                  isFullScreen ? "Exit full screen" : "Enter full screen"
                }>
                {isFullScreen ? <FiMinimize /> : <FiMaximize />}
              </button>
            </div>
            <div // Outer div for scrolling, flex-1, and min-h-0
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto min-h-0 overscroll-contain"
              style={{ scrollbarWidth: "thin" }}>
              <div className="p-4">
                {" "}
                {/* Inner div for padding */}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex mb-3 ${
                      msg.from === "bot" ? "justify-start" : "justify-end"
                    }`}>
                    {msg.text && (
                      <div
                        className={`rounded-lg px-3 py-2 max-w-[80%] ${
                          msg.from === "bot"
                            ? "bg-zinc-700 text-white"
                            : "bg-blue-600 text-white"
                        }`}>
                        {msg.text}
                      </div>
                    )}
                    {msg.image && (
                      <motion.img
                        layoutId={`chat-image-${index}`}
                        src={msg.image}
                        alt="Chat image"
                        onClick={() =>
                          setFullScreenImage({
                            id: `chat-image-${index}`,
                            src: msg.image!,
                          })
                        }
                        className="rounded-lg max-w-[80%] cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
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
        {fullScreenImage && (
          <motion.div
            key="image-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[10000] flex items-center justify-center p-4"
            onClick={() => setFullScreenImage(null)}>
            <motion.img
              layoutId={fullScreenImage.id}
              src={fullScreenImage.src}
              alt="Full screen chat image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
