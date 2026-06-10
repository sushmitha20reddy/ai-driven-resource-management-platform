"use client";

import { useState } from "react";
import axios from "axios";

export default function SignupPage() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "https://ai-platform-backend-5msg.onrender.com/signup",
        {
          name,
          email,
          password
        }
      );

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);

      alert("Signup failed ❌");
    }
  };

  return (
  <main
    className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-black
    overflow-hidden
    relative
    px-6
  "
  >
    {/* Background Glow */}
    <div className="absolute inset-0">
      <div
        className="
        absolute
        left-0
        top-20
        w-[500px]
        h-[500px]
        bg-blue-600/20
        blur-[150px]
      "
      />

      <div
        className="
        absolute
        right-0
        bottom-20
        w-[500px]
        h-[500px]
        bg-purple-600/20
        blur-[150px]
      "
      />
    </div>

    {/* Signup Card */}
    <div
      className="
      relative
      z-10
      w-full
      max-w-lg
      bg-[#071127]/80
      backdrop-blur-xl
      border
      border-purple-500/20
      rounded-[32px]
      p-10
      shadow-[0_0_50px_rgba(139,92,246,0.15)]
    "
    >
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div
          className="
          w-24
          h-24
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-purple-600
          flex
          items-center
          justify-center
          text-5xl
        "
        >
          🚀
        </div>
      </div>

      {/* Heading */}
      <h1
        className="
        text-center
        text-5xl
        font-bold
        text-white
      "
      >
        Create Account 🚀
      </h1>

      <p
        className="
        text-center
        text-slate-400
        mt-3
        mb-8
      "
      >
        Start your AI learning journey today
      </p>

      {/* Name */}
      <input
        type="text"
        placeholder="👤 Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
        w-full
        mb-5
        bg-black/40
        border
        border-slate-700
        rounded-2xl
        px-5
        py-4
        text-white
        outline-none
        focus:border-blue-500
      "
      />

      {/* Email */}
      <input
        type="email"
        placeholder="📧 Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
        w-full
        mb-5
        bg-black/40
        border
        border-slate-700
        rounded-2xl
        px-5
        py-4
        text-white
        outline-none
        focus:border-blue-500
      "
      />

      {/* Password */}
      <input
        type="password"
        placeholder="🔒 Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
        w-full
        mb-6
        bg-black/40
        border
        border-slate-700
        rounded-2xl
        px-5
        py-4
        text-white
        outline-none
        focus:border-blue-500
      "
      />

      {/* Button */}
      <button
        onClick={handleSignup}
        disabled={loading}
        className="
        w-full
        py-4
        rounded-2xl
        text-lg
        font-semibold
        text-white
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        hover:scale-[1.02]
        transition-all
      "
      >
        {loading ? "Creating..." : "Sign Up →"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-slate-700"></div>

        <span className="text-slate-400 text-sm">
          or continue with
        </span>

        <div className="flex-1 h-px bg-slate-700"></div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button
          className="
          border border-slate-700
          rounded-xl
          py-3
          text-2xl
          hover:border-blue-500
        "
        >
          🌐
        </button>

        <button
          className="
          border border-slate-700
          rounded-xl
          py-3
          text-2xl
          hover:border-blue-500
        "
        >
          🐱
        </button>

        <button
          className="
          border border-slate-700
          rounded-xl
          py-3
          text-2xl
          hover:border-blue-500
        "
        >
          🪟
        </button>
      </div>

      {/* Login Link */}
      <p
        className="
        text-center
        text-slate-400
        mt-8
      "
      >
        Already have an account?{" "}
        <a
          href="/login"
          className="
          text-blue-400
          hover:text-blue-300
        "
        >
          Login
        </a>
      </p>
    </div>
  </main>
);
}