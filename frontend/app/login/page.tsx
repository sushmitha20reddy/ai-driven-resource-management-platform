"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

 const handleLogin = async () => {
  try {
    setLoading(true);

    const API_URL =
      "https://ai-platform-backend-5msg.onrender.com";

    const response = await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      response.data.access_token
    );

    console.log("Saving email:", email);

localStorage.setItem(
  "user_email",
  email
);

console.log(
  "Stored:",
  localStorage.getItem("user_email")
);

    alert("Login successful 🚀");

    router.push("/dashboard");

  } catch (error) {

    console.error(error);

    alert("Invalid credentials ❌");

  } finally {

    setLoading(false);

  }
};

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800">

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Welcome Back 🚀
        </h1>

        <div className="space-y-5">

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
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 py-4 rounded-xl text-white font-semibold hover:bg-blue-500 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

      </div>

    </main>
  );
}