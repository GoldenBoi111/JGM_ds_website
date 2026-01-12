import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiMaximize,
  FiMinimize,
  FiLoader,
  FiDownload,
  FiUser,
} from "react-icons/fi";

interface Message {
  from: "bot" | "user";
  text?: string;
  image?: string;
  refs?: string[]; // Array of file references from the API
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
  const [sessionId] = useState<string>(() => {
    // Get session ID from localStorage or generate a new one
    const storedId = localStorage.getItem("jgm-session-id");
    if (storedId) return storedId;

    // Generate a new session ID using crypto.randomUUID()
    const newId = crypto.randomUUID();
    localStorage.setItem("jgm-session-id", newId);
    return newId;
  });

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
   * Cleans up bot responses to make them more readable
   */
  const cleanBotResponse = (text: string): string => {
    if (!text) return text;

    console.log("Original text before cleaning:", text);

    // Basic cleaning: remove excessive equals signs and clean up newlines
    let cleaned = text
      .replace(/={2,}\s*/g, "") // Remove excessive equals signs
      .replace(/\n\s*\n\s*\n/g, "\n\n") // Clean up multiple newlines
      .replace(/[ \t]+/g, " ") // Remove excessive spaces
      .trim(); // Remove leading/trailing whitespace

    console.log("Final cleaned text:", cleaned);

    return cleaned;
  };

  /**
   * Generates HTML transcript from messages
   */
  const generateHtmlTranscript = (messages: Message[]) => {
    // Filter out the initial messages if needed
    const conversationMessages = messages.filter(
      (msg) =>
        !(
          msg.text === "Hello! How can I help you today?" ||
          (msg.image && msg.id === "initial-2")
        )
    );

    const html = [
      "<!doctype html>",
      "<html>",
      "<head>",
      '<meta charset="utf-8">',
      "<title>JGM Conversation - Google Gemini Powered</title>",
      "<style>",
      'body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 24px; background: #f5f5f5; }',
      ".container { max-width: 900px; margin: auto; background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }",
      "h1 { color: #1a1a2e; margin-top: 0; }",
      ".badge { background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 700; }",
      ".message { margin: 20px 0; padding: 16px; border-radius: 8px; }",
      ".user { background: #e3f2fd; border-left: 4px solid #2196f3; }",
      ".bot { background: #e8f5e9; border-left: 4px solid #4caf50; }",
      ".label { font-weight: 700; color: #333; margin-bottom: 8px; }",
      ".content { white-space: pre-wrap; line-height: 1.6; color: #333; }",
      ".content strong { font-weight: bold; color: #1a1a2e; }",
      ".timestamp { font-size: 0.8em; color: #777; margin-top: 8px; }",
      ".attachments { margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee; }",
      ".section-header { font-weight: 600; color: #555; font-size: 0.9em; margin-bottom: 8px; }",
      ".attachment { margin-bottom: 12px; }",
      ".attachment-header { font-weight: 500; color: #333; margin-bottom: 6px; }",
      ".attachment-header .icon { margin-right: 6px; }",
      ".embedded-map, .embedded-pdf { width: 100%; height: 300px; border: 1px solid #ccc; border-radius: 8px; margin-top: 8px; }",
      ".embedded-chart { max-width: 100%; border-radius: 8px; margin-top: 8px; }",
      "</style>",
      "</head>",
      "<body>",
      '<div class="container">',
      '<h1>🤖 JGM Insights Assistant <span class="badge">GOOGLE GEMINI</span></h1>',
      "<p><em>Conversation transcript generated on " +
        new Date().toLocaleString() +
        "</em></p>",
    ];

    conversationMessages.forEach((msg) => {
      const role = msg.from === "user" ? "user" : "bot";
      const who = msg.from === "user" ? "You" : "Assistant";
      const cssClass = role;

      html.push(`<div class="message ${cssClass}">`);
      html.push(`<div class="label">${who}</div>`);

      // Handle text content
      if (msg.text) {
        let safeText = msg.text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        // Convert **text** to <strong>text</strong> for bold formatting first
        safeText = safeText.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

        // Convert bullet points to HTML list format for better presentation
        if (safeText.includes("•")) {
          const lines = safeText.split("\n");
          const processedLines = [];
          let inList = false;

          for (const line of lines) {
            if (line.trim().startsWith("•")) {
              if (!inList) {
                if (
                  processedLines.length > 0 &&
                  !processedLines[processedLines.length - 1].endsWith("<ul>")
                ) {
                  processedLines.push("<br>"); // Add line break before starting a list
                }
                processedLines.push("<ul>");
                inList = true;
              }
              const listItem = line.replace(/^\s*•\s*/, "");
              processedLines.push(`<li>${listItem}</li>`);
            } else {
              if (inList) {
                processedLines.push("</ul>");
                inList = false;
              }
              processedLines.push(line);
            }
          }

          if (inList) {
            processedLines.push("</ul>");
          }

          safeText = processedLines.join("");
        }

        html.push(`<div class="content">${safeText}</div>`);
      }

      // Handle file references (attachments)
      if (msg.refs && msg.refs.length > 0) {
        html.push('<div class="attachments">');
        html.push('<div class="section-header">Attachments:</div>');

        msg.refs.forEach((ref) => {
          let icon = "📎";
          let label = "File";
          let isEmbeddable = false;
          let embedHtml = "";

          if (ref.includes(".html") || ref.includes("map")) {
            icon = "🗺️";
            label = "Map";
            isEmbeddable = true;
            embedHtml = `<iframe src="${
              ref.startsWith("/")
                ? "https://jgm-chatbot-1.onrender.com" + ref
                : ref
            }" class="embedded-map" title="Interactive Map" style="width: 100%; height: 300px; border: 1px solid #ccc; border-radius: 8px; margin-top: 8px;"></iframe>`;
          } else if (
            ref.includes(".png") ||
            ref.includes(".jpg") ||
            ref.includes(".jpeg") ||
            ref.includes("chart") ||
            ref.includes("graph")
          ) {
            icon = "📊";
            label = "Chart";
            isEmbeddable = true;
            embedHtml = `<img src="${
              ref.startsWith("/")
                ? "https://jgm-chatbot-1.onrender.com" + ref
                : ref
            }" alt="Chart or Graph" class="embedded-chart" style="max-width: 100%; border-radius: 8px; margin-top: 8px;" />`;
          } else if (ref.includes(".pdf")) {
            icon = "📄";
            label = "PDF";
            isEmbeddable = true;
            embedHtml = `<iframe src="${
              ref.startsWith("/")
                ? "https://jgm-chatbot-1.onrender.com" + ref
                : ref
            }" class="embedded-pdf" title="PDF Document" style="width: 100%; height: 300px; border: 1px solid #ccc; border-radius: 8px; margin-top: 8px;"></iframe>`;
          } else if (ref.includes(".csv") || ref.includes(".xlsx")) {
            icon = "📈";
            label = "Data";
          }

          if (isEmbeddable) {
            html.push(`<div class="attachment embedded">`);
            html.push(
              `<div class="attachment-header"><span class="icon">${icon}</span> ${label}</div>`
            );
            html.push(embedHtml);
            html.push("</div>");
          } else {
            // For non-embeddable files, create a link
            html.push(`<div class="attachment link">`);
            html.push(
              `<div class="attachment-header"><span class="icon">${icon}</span> ${label}: <a href="${
                ref.startsWith("/")
                  ? "https://jgm-chatbot-1.onrender.com" + ref
                  : ref
              }" target="_blank">${ref.split("/").pop() || "File"}</a></div>`
            );
            html.push("</div>");
          }
        });

        html.push("</div>");
      }

      // Handle image content
      if (msg.image) {
        html.push(
          `<div class="content"><img src="${msg.image}" alt="Chat image" style="max-width: 100%; border-radius: 8px; margin-top: 8px;" /></div>`
        );
      }

      html.push(
        `<div class="timestamp">${new Date().toLocaleTimeString()}</div>`
      );
      html.push("</div>");
    });

    html.push("</div></body></html>");

    return html.join("\n");
  };

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
    if (userMessage && !isLoading) {
      // Prevent sending when loading
      // Add user message to chat
      const userMessageObj: Message = {
        from: "user",
        text: userMessage,
        id: `user-${Date.now()}`, // Add unique ID
      };
      setMessages((prev) => [...prev, userMessageObj]);
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
              "X-Session-ID": sessionId, // Include session ID in header
            },
            body: JSON.stringify({ message: userMessage }),
            credentials: "include", // Include cookies for session management
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log("Raw backend response:", data);
              const cleanedReply = cleanBotResponse(data.reply);
              console.log("Cleaned response:", cleanedReply);

              // Check if the response contains "created an interactive map" and trigger full screen
              if (
                cleanedReply
                  .toLowerCase()
                  .includes("created an interactive map")
              ) {
                setIsFullScreen(true);
              }

              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  from: "bot",
                  text: cleanedReply,
                  refs: data.refs || [], // Include refs from the API response
                  id: `bot-${Date.now()}`,
                },
              ]);
            })
            .catch((error) => {
              console.error("Error:", error);
              // Add an error message to the chat to inform the user
              const errorMessage = cleanBotResponse(
                "Sorry, I'm having trouble connecting to my server right now. Please try again later."
              );
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  from: "bot",
                  text: errorMessage,
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
              <h3 className="font-semibold text-white" tabIndex={0}>
                JGM Support
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={async () => {
                    // Filter out initial messages
                    const conversationMessages = messages.filter(
                      (msg) =>
                        !(
                          msg.text === "Hello! How can I help you today?" ||
                          (msg.image && msg.id === "initial-2")
                        )
                    );

                    if (conversationMessages.length === 0) {
                      setMessages((prev) => [
                        ...prev,
                        {
                          from: "bot",
                          text: cleanBotResponse(
                            "No conversation found to download. Please have a conversation first."
                          ),
                          id: `error-${Date.now()}`,
                        },
                      ]);
                      return;
                    }

                    try {
                      // Generate HTML content directly in the frontend
                      const htmlContent = generateHtmlTranscript(messages);

                      // Create a Blob with the HTML content
                      const blob = new Blob([htmlContent], {
                        type: "text/html;charset=utf-8",
                      });

                      // Create download link
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;

                      // Generate timestamp for filename
                      const now = new Date();
                      const timestamp = now
                        .toISOString()
                        .slice(0, 19)
                        .replace(/:/g, "-");
                      a.download = `JGM_Conversation_${timestamp}.html`;

                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error("Download error:", error);
                      setMessages((prev) => [
                        ...prev,
                        {
                          from: "bot",
                          text: cleanBotResponse(
                            "Sorry, there was an error generating the download."
                          ),
                          id: `error-${Date.now()}`,
                        },
                      ]);
                    }
                  }}
                  className="text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Download conversation"
                  tabIndex={0}>
                  <FiDownload />
                </button>
                <button
                  onClick={async () => {
                    try {
                      // Prompt user for profile information
                      const firstName = prompt("First name:") || "";
                      const lastName = prompt("Last name:") || "";
                      const role =
                        prompt(
                          "Role (parent/student/teacher/NGO/donor/investor):"
                        ) || "";
                      const contact = prompt("Contact (email/phone):") || "";

                      // Validate that at least some information was provided
                      if (!firstName && !lastName && !role && !contact) {
                        setMessages((prev) => [
                          ...prev,
                          {
                            from: "bot",
                            text: cleanBotResponse(
                              "Profile update cancelled or no information provided."
                            ),
                            id: `profile-cancel-${Date.now()}`,
                          },
                        ]);
                        return;
                      }

                      // Call the backend profile endpoint
                      const response = await fetch(
                        "https://jgm-chatbot-1.onrender.com/api/set_profile",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "X-Session-ID": sessionId, // Include session ID in header
                          },
                          body: JSON.stringify({
                            first_name: firstName,
                            last_name: lastName,
                            role: role,
                            contact: contact,
                          }),
                          credentials: "include", // Include cookies for session management
                        }
                      );

                      if (!response.ok) {
                        throw new Error(
                          `Profile update failed: ${response.status}`
                        );
                      }

                      const data = await response.json();

                      console.log("Profile API response:", data);
                      // Add bot response to chat
                      const cleanedMessage = cleanBotResponse(
                        data.message || "Profile updated successfully!"
                      );
                      setMessages((prev) => [
                        ...prev,
                        {
                          from: "bot",
                          text: cleanedMessage,
                          id: `profile-${Date.now()}`,
                        },
                      ]);
                    } catch (error) {
                      console.error("Profile update error:", error);
                      const errorMessage = cleanBotResponse(
                        "Sorry, there was an error updating your profile."
                      );
                      setMessages((prev) => [
                        ...prev,
                        {
                          from: "bot",
                          text: errorMessage,
                          id: `profile-error-${Date.now()}`,
                        },
                      ]);
                    }
                  }}
                  className="text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label="Set profile"
                  tabIndex={0}>
                  <FiUser />
                </button>
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
                    <div className="flex flex-col max-w-[85%]">
                      {msg.text && (
                        <div
                          className={`rounded-lg px-3 py-2 ${
                            msg.from === "bot"
                              ? "bg-zinc-700 text-white rounded-bl-none"
                              : "bg-blue-500 text-white rounded-br-none text-right"
                          }`}
                          style={{ whiteSpace: "pre-wrap" }}
                          dangerouslySetInnerHTML={{
                            __html: msg.text
                              .replace(/&/g, "&amp;")
                              .replace(/</g, "&lt;")
                              .replace(/>/g, "&gt;")
                              .replace(
                                /\*\*([^*]+)\*\*/g,
                                "<strong>$1</strong>"
                              ),
                          }}></div>
                      )}
                      {msg.refs && msg.refs.length > 0 && (
                        <div className="mt-2 w-full">
                          <div className="text-xs font-semibold text-zinc-400 mb-1">
                            Attachments:
                          </div>
                          <div className="space-y-2">
                            {msg.refs.map((ref, refIndex) => {
                              // Determine file type based on extension
                              let icon = "📎";
                              let label = "File";
                              let isEmbeddable = false;
                              let embedComponent = null;

                              if (
                                ref.includes(".html") ||
                                ref.includes("map")
                              ) {
                                icon = "🗺️";
                                label = "Map";
                                isEmbeddable = true;
                                embedComponent = (
                                  <iframe
                                    src={
                                      ref.startsWith("/")
                                        ? `https://jgm-chatbot-1.onrender.com${ref}`
                                        : ref
                                    }
                                    className="w-full h-64 border border-zinc-600 rounded-lg"
                                    title="Interactive Map"
                                    sandbox="allow-same-origin allow-scripts"
                                  />
                                );
                              } else if (
                                ref.includes(".png") ||
                                ref.includes(".jpg") ||
                                ref.includes(".jpeg") ||
                                ref.includes("chart") ||
                                ref.includes("graph")
                              ) {
                                icon = "📊";
                                label = "Chart";
                                isEmbeddable = true;
                                embedComponent = (
                                  <motion.img
                                    layoutId={`ref-image-${refIndex}-${
                                      msg.id || index
                                    }`}
                                    src={
                                      ref.startsWith("/")
                                        ? `https://jgm-chatbot-1.onrender.com${ref}`
                                        : ref
                                    }
                                    alt="Chart or Graph"
                                    className="w-full max-h-64 object-contain rounded-lg border border-zinc-600 cursor-pointer"
                                    onClick={() =>
                                      setFullScreenImage({
                                        id: `ref-image-${refIndex}-${
                                          msg.id || index
                                        }`,
                                        src: ref.startsWith("/")
                                          ? `https://jgm-chatbot-1.onrender.com${ref}`
                                          : ref,
                                      })
                                    }
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  />
                                );
                              } else if (ref.includes(".pdf")) {
                                icon = "📄";
                                label = "PDF";
                                isEmbeddable = true;
                                embedComponent = (
                                  <iframe
                                    src={
                                      ref.startsWith("/")
                                        ? `https://jgm-chatbot-1.onrender.com${ref}`
                                        : ref
                                    }
                                    className="w-full h-64 border border-zinc-600 rounded-lg"
                                    title="PDF Document"
                                  />
                                );
                              } else if (
                                ref.includes(".csv") ||
                                ref.includes(".xlsx")
                              ) {
                                icon = "📈";
                                label = "Data";
                              }

                              // For non-embeddable files, show as a link
                              if (!isEmbeddable) {
                                const fileUrl = ref.startsWith("/")
                                  ? `https://jgm-chatbot-1.onrender.com${ref}`
                                  : ref;

                                return (
                                  <a
                                    key={refIndex}
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full p-3 bg-zinc-800/50 hover:bg-zinc-700/70 border border-zinc-600 rounded-lg text-sm transition-all duration-200 group">
                                    <div className="flex items-center">
                                      <span className="text-lg mr-3 group-hover:scale-110 transition-transform">
                                        {icon}
                                      </span>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-white truncate">
                                          {label}
                                        </div>
                                        <div className="text-xs text-zinc-400 truncate">
                                          {ref.split("/").pop() || "File"}
                                        </div>
                                      </div>
                                      <span className="ml-2 text-xs text-zinc-500 group-hover:text-zinc-300">
                                        ↗
                                      </span>
                                    </div>
                                  </a>
                                );
                              }

                              // For embeddable content, show the embedded component
                              return (
                                <div key={refIndex} className="w-full">
                                  <div className="flex items-center text-sm mb-1">
                                    <span className="mr-2">{icon}</span>
                                    <span className="font-medium">{label}</span>
                                  </div>
                                  {embedComponent}
                                </div>
                              );
                            })}
                          </div>
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
                          className="rounded-lg max-w-[80%] mt-2 cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
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
