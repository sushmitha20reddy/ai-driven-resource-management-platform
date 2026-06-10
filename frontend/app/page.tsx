"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="mx-6 mt-6 border border-slate-800 rounded-3xl px-8 py-5 flex justify-between items-center backdrop-blur-xl">
        <h1 className="text-4xl font-bold">
          <span className="text-blue-500">AI</span> Platform 🚀
        </h1>

        <div className="flex gap-10 items-center">
          <Link href="/" className="text-blue-400 font-semibold">
            Home
          </Link>

          <Link href="/login">Login</Link>

          <Link
            href="/signup"
            className="
              px-8 py-3
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
            "
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-10 py-20">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>

            <div
              className="
                inline-block
                px-5 py-3
                rounded-full
                border
                border-slate-700
                bg-slate-900/50
                mb-8
              "
            >
              🚀 AI-Powered Learning Companion
            </div>

            <h1
              className="
                text-7xl
                font-extrabold
                leading-tight
              "
            >
              AI Driven Intelligent
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-cyan-400
                  via-blue-500
                  to-purple-500
                  text-transparent
                  bg-clip-text
                "
              >
                Resource Management
              </span>

              <br />
              Platform
            </h1>

            <p
              className="
                text-slate-400
                text-xl
                mt-8
                max-w-2xl
              "
            >
              Learn smarter, generate AI roadmaps,
              analyze resumes, practice quizzes,
              and track your learning journey.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                href="/signup"
                className="
                  px-10 py-5
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-xl
                  font-semibold
                "
              >
                Get Started →
              </Link>

              <Link
                href="/login"
                className="
                  px-10 py-5
                  rounded-2xl
                  border
                  border-slate-700
                  text-xl
                "
              >
                Login →
              </Link>

            </div>

          </div>

          {/* RIGHT SIDE AI IMAGE */}
          <div className="relative flex justify-center">

            {/* Glow */}
            <div
              className="
                absolute
                w-[500px]
                h-[500px]
                rounded-full
                bg-purple-700/20
                blur-[120px]
              "
            />

            {/* AI Head */}
            <div
              className="
                relative
                w-[450px]
                h-[450px]
                rounded-full
                border
                border-cyan-500/30
                bg-gradient-to-br
                from-blue-950
                to-purple-950
                flex
                items-center
                justify-center
                shadow-[0_0_80px_rgba(59,130,246,0.4)]
              "
            >
              <div className="text-9xl">🧠</div>
            </div>

            {/* Floating Cards */}

            <div
              className="
                absolute
                top-0
                left-10
                bg-slate-900/80
                border
                border-cyan-500/30
                rounded-3xl
                p-5
              "
            >
              💬 AI Assistant
            </div>

            <div
              className="
                absolute
                top-10
                right-0
                bg-slate-900/80
                border
                border-purple-500/30
                rounded-3xl
                p-5
              "
            >
              🎓 AI Roadmaps
            </div>

            <div
              className="
                absolute
                bottom-20
                left-0
                bg-slate-900/80
                border
                border-green-500/30
                rounded-3xl
                p-5
              "
            >
              ✅ Quizzes
            </div>

            <div
              className="
                absolute
                bottom-20
                right-0
                bg-slate-900/80
                border
                border-orange-500/30
                rounded-3xl
                p-5
              "
            >
              📄 Resume Analyzer
            </div>

          </div>

        </div>

      </section>

      {/* FEATURE CARDS */}

      <section className="max-w-7xl mx-auto px-10 pb-20">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900/60 rounded-3xl p-8 border border-purple-500/20">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold">
              AI Powered
            </h3>
            <p className="text-slate-400 mt-3">
              Smart AI assistance for learning.
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-3xl p-8 border border-blue-500/20">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-2xl font-bold">
              Track Progress
            </h3>
            <p className="text-slate-400 mt-3">
              Monitor growth and performance.
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-3xl p-8 border border-green-500/20">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold">
              Personalized
            </h3>
            <p className="text-slate-400 mt-3">
              Learning tailored for you.
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-3xl p-8 border border-orange-500/20">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold">
              Fast & Efficient
            </h3>
            <p className="text-slate-400 mt-3">
              Save time and learn faster.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}