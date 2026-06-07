"use client";

import Sidebar from "../../components/Sidebar";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen  text-white flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-5xl font-bold mb-4">
          Study Resources 📚
        </h1>

        <p className="text-gray-400 mb-10">
          Curated resources for coding, AI, development and certifications.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div
            onClick={() => window.open("https://leetcode.com", "_blank")}
            className=" bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-blue-900/50 cursor-pointer hover:border-blue-500"
          >
            <h2 className="text-2xl font-bold mb-2">
              LeetCode
            </h2>

            <p className="text-gray-400">
              Coding Interview Preparation
            </p>
          </div>

          <div
            onClick={() => window.open("https://www.geeksforgeeks.org", "_blank")}
            className="bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-blue-900/50 cursor-pointer hover:border-blue-500"
          >
            <h2 className="text-2xl font-bold mb-2">
              GeeksforGeeks
            </h2>

            <p className="text-gray-400">
              Programming Tutorials & DSA
            </p>
          </div>

          <div
            onClick={() => window.open("https://huggingface.co", "_blank")}
            className="bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-blue-900/50 cursor-pointer hover:border-blue-500"
          >
            <h2 className="text-2xl font-bold mb-2">
              Hugging Face
            </h2>

            <p className="text-gray-400">
              AI Models and Datasets
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}