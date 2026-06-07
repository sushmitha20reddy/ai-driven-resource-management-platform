"use client";

import { useState, useRef, useEffect } from "react";

import axios from "axios";

export default function AssistantPage() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello 👋 Ask me anything!"
    }
  ]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    try {

      setLoading(true);

      const response = await axios.post(
        "https://ai-platform-backend-5msg.onrender.com/chat",
        {
          message: currentMessage
        }
      );

      const aiMessage = {
        role: "ai",
        text: response.data.response
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong ❌"
        }
      ]);

    } finally {

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-white flex">
      {/* SIDEBAR */}

      <aside className="w-72 bg-gray-950 border-r border-gray-800 p-6">

        <h1 className="text-3xl font-bold mb-10">
          AI Platform 🚀
        </h1>

        <div className="space-y-4">

          <button className="w-full bg-blue-600 py-4 rounded-xl text-left px-5">
            AI Assistant
          </button>

          <button className="w-full bg-gray-900 py-4 rounded-xl text-left px-5">
            PDF Summarizer
          </button>

          <button className="w-full bg-gray-900 py-4 rounded-xl text-left px-5">
            Resume Analyzer
          </button>

          <button className="w-full bg-gray-900 py-4 rounded-xl text-left px-5">
            Resource Booking
          </button>

        </div>

      </aside>

      {/* CHAT AREA */}

      <section className="flex-1 flex flex-col">

        {/* TOP */}

        <div className="border-b border-gray-800 p-6">

          <h1 className="text-3xl font-bold">
            AI Assistant 🤖
          </h1>

        </div>

        {/* MESSAGES */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-2xl px-6 py-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-blue-600"
                    : "bg-gray-900 border border-gray-800"
                }`}
              >
                {msg.text}
              </div>

            </div>
          ))}

          {loading && (

            <div className="flex justify-start">

              <div className="bg-gray-900 border border-gray-800 px-6 py-4 rounded-2xl">
                AI is typing...
              </div>

            </div>
          )}

          <div ref={chatEndRef}></div>

        </div>

        {/* INPUT */}

        <div className="border-t border-gray-800 p-6 flex gap-4">

          <input
            type="text"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 px-8 rounded-xl hover:bg-blue-500 transition"
          >
            {loading ? "Thinking..." : "Send"}
          </button>

        </div>

      </section>

    </main>
  );
}