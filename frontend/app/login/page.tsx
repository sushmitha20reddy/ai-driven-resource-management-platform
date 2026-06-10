"use client";

import { Mail, Lock, Eye, Rocket } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="h-screen overflow-y-auto bg-black relative">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[150px]" />

      <section className="relative z-10 h-screen flex items-center justify-center px-10 overflow-y-auto">

        <div className="grid lg:grid-cols-2 gap-20 items-center w-full max-w-7xl">

          {/* LEFT SIDE */}

          <div className="hidden lg:flex justify-center">

            <img
              src="/robot ai.jpeg"
              className="
              w-full
              max-w-md
              xl:max-w-lg
              object-contain
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
                  w-24
                  h-24
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-600
                  flex
                  items-center
                  justify-center
                "
              >
                <Rocket size={42} />
              </div>

            </div>

            <h1 className="text-4xl font-bold text-center">
              Welcome Back 🚀
            </h1>

            <p className="text-center text-gray-400 mt-4 mb-10 text-lg">
              Sign in to continue your learning journey
            </p>

            {/* EMAIL */}

            <div className="relative mb-6">

              <Mail
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="email"
                placeholder="Email"
                className="
                  w-full
                  bg-black/40
                  border border-slate-700
                  rounded-2xl
                  py-5
                  pl-14
                  text-lg
                  outline-none
                  focus:border-blue-500
                "
              />

            </div>

            {/* PASSWORD */}

            <div className="relative mb-6">

              <Lock
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="password"
                placeholder="Password"
                className="
                  w-full
                  bg-black/40
                  border border-slate-700
                  rounded-2xl
                  py-5
                  pl-14
                  pr-14
                  text-lg
                  outline-none
                  focus:border-blue-500
                "
              />

              <Eye
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

            </div>

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
              className="
                w-full
                py-5
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-xl
                font-semibold
                hover:scale-105
                transition-all
              "
            >
              Login →
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