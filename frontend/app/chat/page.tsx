"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState([
    {
      text: "Hello 👋 How can I help you today?",
      sender: "ai",
    },
  ]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const newChat = () => {
    setMessages([
      {
        text: "Hello 👋 How can I help you today?",
        sender: "ai",
      },
    ]);

    setMessage("");
  };
  const sendMessage = async () => {
    if (message.trim() === "") return;

    const currentMessage = message;

    const userMessage = {
      text: currentMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    try {
      setLoading(true);

      const API_URL = "https://ai-platform-backend-5msg.onrender.com";

      const response = await axios.post(`${API_URL}/chat`, {
        message: currentMessage,
      });

      const aiMessage = {
        text: response.data.response,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Failed to get AI response",
          sender: "ai",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen">
      {/* Sidebar */}
      <aside
        className="
w-80
bg-[#020617]
border-r
border-slate-800
p-5
flex
flex-col
text-white
"
      >
        <h1 className="text-2xl font-bold mb-8">AI Product 🚀</h1>

        <button
          onClick={newChat}
          className="bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-500 transition"
        >
          + New Chat
        </button>
      </aside>

      {/* Chat Section */}
      <section className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-gray-300 p-5 text-3xl font-bold text-white">
          🤖 AI Assistant
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-4 rounded-2xl max-w-xl ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-white border border-slate-700"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 px-5 py-4 rounded-2xl max-w-xl">
                AI is typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-slate-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask anything about AI, Coding, DSA..."
              className="
        flex-1
        bg-slate-900
        text-white
        px-5
        py-4
        rounded-2xl
        border
        border-slate-700
        focus:border-blue-500
        outline-none
      "
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="
        px-8
        py-4
        bg-blue-600
        hover:bg-blue-500
        rounded-2xl
        font-semibold
        text-white
      "
            >
              {loading ? "⏳" : "🚀 Send"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
