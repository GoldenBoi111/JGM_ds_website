import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiMaximize,
  FiMinimize,
  FiLoader,
} from "react-icons/fi";

interface Message {
  from: "bot" | "user";
  text?: string;
  image?: string;
  id: string; // Make ID required for all messages
}

/**
 * ChatBot component provides an interactive chat interface for users to communicate
 * with an AI assistant. It includes features like full-screen mode, message history,
 * loading states, and error handling.
 *
 * @returns {JSX.Element} The rendered ChatBot component
 */
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessages = useRef<Message[]>([
    { from: "bot", text: "Hello! How can I help you today?", id: "initial-1" },
    {
      from: "bot",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      id: "initial-2",
    },
  ]);
  const [messages, setMessages] = useState<Message[]>(initialMessages.current);
  const [inputValue, setInputValue] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [fullScreenImage, setFullScreenImage] = useState<{
    id: string;
    src: string;
  } | null>(null);

  /**
   * Scrolls the chat messages container to the bottom to show the latest message
   */
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

  /**
   * Toggles the visibility of the chat window
   * If chat is open and in full screen mode, exits full screen
   */
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen && isFullScreen) {
      setIsFullScreen(false);
    }
  };

  /**
   * Toggles the full screen mode of the chat window
   */
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  /**
   * Handles sending a message to the chat
   * Processes user input, adds to message history, and calls the API
   *
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (userMessage && !isLoading) { // Prevent sending when loading
      // Add user message to chat
      const userMessageObj: Message = {
        from: "user",
        text: userMessage,
        id: `user-${Date.now()}` // Add unique ID
      };
      setMessages(prev => [...prev, userMessageObj]);
      setInputValue("");

      // Set loading state
      setIsLoading(true);

      // Simulate a bot response
      setTimeout(() => {
        if (userMessage.toLowerCase() === "image") {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              from: "bot",
              image:
                "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              id: `bot-${Date.now()}`,
            },
          ]);
          setIsLoading(false); // Reset loading state
        } else {
          fetch("https://jgm-chatbot-1.onrender.com/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  from: "bot",
                  text: data.response,
                  id: `bot-${Date.now()}`,
                },
              ]);
            })
            .catch((error) => {
              console.error("Error:", error);
              // Add an error message to the chat to inform the user
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  from: "bot",
                  text: "Sorry, I'm having trouble connecting to my server right now. Please try again later.",
                  id: `error-${Date.now()}`,
                },
              ]);
            })
            .finally(() => {
              setIsLoading(false); // Reset loading state regardless of success or failure
            });
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
          onTouchStart={() => {}} // Enable hover effects on touch devices
          className="bg-white text-zinc-900 rounded-full w-16 h-16 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          tabIndex={0}>
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
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Chat window">
            <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
              <h3 className="font-semibold text-white" tabIndex={0}>JGM Support</h3>
              <button
                onClick={toggleFullScreen}
                className="text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label={
                  isFullScreen ? "Exit full screen" : "Enter full screen"
                }
                tabIndex={0}>
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
                    key={msg.id || `msg-${index}`}
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
                        layoutId={msg.id || `chat-image-${index}`}
                        src={msg.image}
                        alt="Chat image"
                        onClick={() =>
                          setFullScreenImage({
                            id: msg.id || `chat-image-${index}`,
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
                {isLoading && (
                  <div className="flex justify-start mb-3">
                    <div className="bg-zinc-700 text-white rounded-lg px-3 py-2 max-w-[80%] flex items-center">
                      <FiLoader className="animate-spin mr-2" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-zinc-700 flex"
              role="form"
              aria-label="Chat message input form">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 bg-zinc-800 border border-zinc-600 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white disabled:opacity-50"
                aria-label="Type your message"
                aria-disabled={isLoading}
                tabIndex={0}
                onTouchStart={() => {}} // Enable proper touch behavior
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-r-md active:scale-95"
                aria-label={isLoading ? "Sending message" : "Send message"}
                tabIndex={0}
                onTouchStart={() => {}} // Enable proper touch behavior
                >
                {isLoading ? <FiLoader className="animate-spin" /> : <FiSend />}
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

export default React.memo(ChatBot);
