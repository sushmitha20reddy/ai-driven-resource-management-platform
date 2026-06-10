"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Rocket,
  Mail,
  Lock,
  Eye
} from "lucide-react";


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
    <main className="h-screen overflow-y-auto bg-black relative">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[220px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[220px]" />

      <section className="relative z-10 h-screen flex items-center justify-center px-10 overflow-y-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-6xl">

          {/* LEFT SIDE */}

          <div className="hidden lg:flex justify-center">

            <img
  src="/robot ai.jpeg"
  alt="AI Robot"
  className="
    w-full
    max-w-md
    xl:max-w-lg
    object-contain
    drop-shadow-[0_0_50px_rgba(59,130,246,0.5)]
  "
/>

          </div>

          {/* RIGHT SIDE */}

          <div
            className="
              bg-[#081121]/80
              backdrop-blur-xl
              border
              border-purple-500/30
              rounded-[35px]
              p-8
              shadow-[0_0_40px_rgba(139,92,246,0.3)]
              text-white
            "
          >

            {/* Icon */}

            <div className="flex justify-center mb-8">

              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-600
                  flex
                  items-center
                  justify-center
                "
              >
                <Rocket size={28} />
              </div>

            </div>

            <h1 className="text-3xl font-bold text-center">
              Welcome Back 🚀
            </h1>

            <p className="text-center text-gray-400 mt-4 mb-10 text-lg">
              Sign in to continue your learning journey
            </p>

            {/* EMAIL */}

            <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  className="
    w-full
    bg-black/40
    border border-slate-700
    rounded-2xl
    py-4
    pl-14
    pr-5
    text-lg
    text-white
    outline-none
    focus:border-blue-500
  "
/>

            {/* PASSWORD */}

            <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  className="
    w-full
    bg-black/40
    border border-slate-700
    rounded-2xl
    py-4
    pl-14
    pr-14
    text-lg
    text-white
    outline-none
    focus:border-blue-500
  "
/>

            {/* REMEMBER */}

            <div className="flex justify-between mb-8 text-sm">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <button className="text-blue-400">
                Forgot password?
              </button>

            </div>

            {/* LOGIN BUTTON */}

            <button
  onClick={handleLogin}
  disabled={loading}
  className="
    w-full
    py-4
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    to-purple-600
    text-xl
    font-semibold
    hover:scale-105
    transition-all
    disabled:opacity-50
  "
>
  {loading
    ? "Logging in..."
    : "Login →"}
</button>

            {/* Divider */}

            <div className="flex items-center gap-4 my-8">

              <div className="flex-1 h-px bg-slate-700" />

              <span className="text-gray-400">
                or continue with
              </span>

              <div className="flex-1 h-px bg-slate-700" />

            </div>

            {/* SOCIAL LOGIN */}

            <div className="grid grid-cols-3 gap-4">

              <button className="border border-slate-700 rounded-2xl py-4 text-3xl">
                🌐
              </button>

              <button className="border border-slate-700 rounded-2xl py-4 text-3xl">
                🐱
              </button>

              <button className="border border-slate-700 rounded-2xl py-4 text-3xl">
                🪟
              </button>

            </div>

            <p className="text-center mt-8 text-gray-400">

              Don't have an account?{" "}

              <Link
                href="/signup"
                className="text-blue-400"
              >
                Sign up
              </Link>

            </p>

          </div>

        </div>

      </section>

    </main>
  );
}