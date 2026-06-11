"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Sidebar from "../../components/Sidebar";



export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const [selectedFile, setSelectedFile] =
  useState<File | null>(null);
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

  const handleFileUpload = (
  e: ChangeEvent<HTMLInputElement>
) => {

  const file =
    e.target.files?.[0];

  if (!file) return;

  setSelectedFile(file);

  setMessages((prev) => [
    ...prev,
    {
      text: `📎 Uploaded: ${file.name}`,
      sender: "user",
    },
  ]);

};

const startVoiceInput = () => {

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition not supported");
    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.start();

  recognition.onresult = async (
    event: any
  ) => {

    const transcript =
      event.results[0][0].transcript;

    setMessage(transcript);

    // Auto Send

    const userMessage = {
      text: transcript,
      sender: "user",
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      setLoading(true);

      const API_URL =
        "https://ai-platform-backend-5msg.onrender.com";

    const formData = new FormData();

formData.append( "message", transcript );

if (selectedFile) {
  formData.append(
    "file",
    selectedFile
  );
}

const response =
  await axios.post(
    `${API_URL}/chat`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

      setMessages((prev) => [
        ...prev,
        {
          text: response.data.response,
          sender: "ai",
        },
      ]);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };
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
const formData = new FormData();

formData.append("message", currentMessage);

if (selectedFile) {
  formData.append("file", selectedFile);
}

const response = await axios.post(
  `${API_URL}/chat`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);
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
    <main className="min-h-screen flex text-white">

  <Sidebar />

  <section className="flex-1 p-8">

    {/* Header */}

    <div className="mb-8">

      <h1 className="text-5xl font-bold"> 🤖 AI Assistant </h1>

      <p className="text-slate-400 mt-2">
        Your intelligent learning companion
      </p>


<div className="grid md:grid-cols-4 gap-6 mb-8">

  <div className="bg-slate-900/60 rounded-3xl p-6 border border-purple-500/20">
    <div className="text-5xl mb-4">💻</div>
    <h3 className="text-xl font-bold">Coding Help</h3>
    <p className="text-slate-400 mt-2">
      Debug code and solve problems
    </p>
  </div>

  <div className="bg-slate-900/60 rounded-3xl p-6 border border-blue-500/20">
    <div className="text-5xl mb-4">🎓</div>
    <h3 className="text-xl font-bold">Learning Resources</h3>
    <p className="text-slate-400 mt-2">
      Find study materials
    </p>
  </div>

  <div className="bg-slate-900/60 rounded-3xl p-6 border border-green-500/20">
    <div className="text-5xl mb-4">🎯</div>
    <h3 className="text-xl font-bold">Career Guidance</h3>
    <p className="text-slate-400 mt-2">
      AI career advice
    </p>
  </div>

  <div className="bg-slate-900/60 rounded-3xl p-6 border border-orange-500/20">
    <div className="text-5xl mb-4">📄</div>
    <h3 className="text-xl font-bold">Resume Review</h3>
    <p className="text-slate-400 mt-2">
      Improve your resume
    </p>
  </div>

</div>

    </div>

      {/* Chat Section */}
      <div
  className="
    bg-slate-900/60
    backdrop-blur-xl
    border border-slate-700/40
    rounded-3xl
    overflow-hidden
  "
>
       

        {/* Messages */}
       <div
  className="
    h-[500px]
    overflow-y-auto
    p-8
    space-y-6
  "
>

{messages.length === 1 && !loading && (

  <div className="text-center mt-16">

    <div className="text-7xl mb-5">
      🤖
    </div>

    <h2 className="text-3xl font-bold">
      Hello 👋
    </h2>

    <p className="text-slate-400 mt-3">
      Ask me anything about AI, Coding,
      DSA, Interviews, Career Guidance,
      or Projects.
    </p>

  </div>

)}

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

<div
  className="
    p-6
    border-t
    border-slate-700/40
  "
>
  <div className="flex gap-3 items-center">

    {/* File Upload */}
    <input
      type="file"
      id="fileUpload"
      hidden
      onChange={handleFileUpload}
    />

    <button
      onClick={() =>
        document
          .getElementById("fileUpload")
          ?.click()
      }
      className="
        p-4
        rounded-2xl
        bg-slate-800
        hover:bg-slate-700
        transition
      "
    >
      📎
    </button>

    

    {/* Voice */}

    <button
      onClick={startVoiceInput}
      className="
        p-4
        rounded-2xl
        bg-slate-800
        hover:bg-slate-700
        transition
      "
    >
      🎤
    </button>

    {/* Text Input */}

    <input
      type="text"
      value={message}
      onChange={(e) =>
        setMessage(e.target.value)
      }
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

    {/* Send */}

    <button
      onClick={sendMessage}
      disabled={loading}
      className="
        px-8
        py-4
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        font-semibold
        hover:scale-105
        transition-all
      "
    >
      {loading ? "⏳" : "🚀"}
    </button>

  </div>

  {/* Selected File Preview */}

  {selectedFile && (
    <div className="mt-3 text-sm text-slate-400">
      📎 Selected File: {selectedFile.name}
    </div>
  )}
</div>
</div>

</section>

</main>
  );
}

