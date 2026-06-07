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
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800">

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Create Account 🚀
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white outline-none"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-600 py-4 rounded-xl text-white font-semibold hover:bg-blue-500 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </div>

      </div>

    </main>
  );
}