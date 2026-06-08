"use client";

import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

import {
  Code,
  Database,
  Brain,
  Cpu,
  Cloud,
  Rocket,
  Shield,
  BookOpen
} from "lucide-react";

const phaseIcons = [
  Code,
  Database,
  Brain,
  Cpu,
  Cloud,
  Rocket,
  Shield,
  BookOpen
];

export default function RoadmapPage() {

  const [goal, setGoal] = useState("");


const [roadmapData, setRoadmapData] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

 const generateRoadmap = async () => {

  try {

    setLoading(true);

    const API_URL =
      "https://ai-platform-backend-5msg.onrender.com";

    const response = await axios.post(
  `${API_URL}/generate-roadmap`,
  {
    goal: goal
  }
);

    setRoadmapData(
      response.data.roadmap
    );

  } catch (error) {

    console.error(error);

    alert("Failed to generate roadmap");

  } finally {

    setLoading(false);

  }

};

const totalDuration =
  roadmapData.reduce((total, step) => {
    const weeks = parseInt(step.duration) || 0;
    return total + weeks;
  }, 0);

const difficulty =
  roadmapData.length >= 10
    ? "Advanced"
    : roadmapData.length >= 7
    ? "Medium"
    : "Beginner";

  return (

    <main className="min-h-screen  text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <div className="mb-10">

  <h1
    className="
      text-6xl
      font-extrabold
      bg-gradient-to-r
      from-blue-400
      via-cyan-400
      to-purple-500
      bg-clip-text
      text-transparent
      mb-3
    "
  >
    AI Learning Roadmap 🚀
  </h1>

  <p className="text-slate-400 text-lg">
    Get a personalized AI-powered learning roadmap to achieve your goals
  </p>

</div>

       <div className="flex gap-4 mb-10">

  <input
    placeholder="Example: Become AI Engineer"
    value={goal}
    onChange={(e) => setGoal(e.target.value)}
    className="
      flex-1
      bg-slate-900/60
      backdrop-blur-xl
      border
      border-slate-700/40
      rounded-2xl
      px-6
      py-5
      text-white
      text-lg
      outline-none
    "
  />

  <button
    onClick={generateRoadmap}
    className="
      px-8
      py-5
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      to-purple-600
      font-semibold
      hover:scale-105
      transition-all
    "
  >
    {loading
 ? "Generating..."
 : "✨ Generate Roadmap"}
  </button>

</div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">

  {/* Goal */}
  <div
    className="
      bg-slate-900/60
      backdrop-blur-xl
      border border-slate-700/40
      rounded-3xl
      p-6
      shadow-xl
      hover:scale-105
      transition-all
    "
  >
    <div className="text-4xl mb-3">🎯</div>

    <h3 className="text-slate-400">
      Your Goal
    </h3>

    <p className="text-2xl font-bold mt-2">
  {goal || "Not Generated"}
</p>

    <p className="text-slate-500 mt-2">
      Target Role
    </p>
  </div>

  {/* Steps */}
  <div
    className="
      bg-slate-900/60
      backdrop-blur-xl
      border border-green-500/20
      rounded-3xl
      p-6
      shadow-xl
      hover:scale-105
      transition-all
    "
  >
    <div className="text-4xl mb-3">📚</div>

    <h3 className="text-slate-400">
      Total Steps
    </h3>

    <p className="text-5xl font-bold mt-2">
  {roadmapData.length}
</p>

    <p className="text-slate-500 mt-2">
      Learning Steps
    </p>
  </div>

  {/* Duration */}
  <div
    className="
      bg-slate-900/60
      backdrop-blur-xl
      border border-orange-500/20
      rounded-3xl
      p-6
      shadow-xl
      hover:scale-105
      transition-all
    "
  >
    <div className="text-4xl mb-3">⏱</div>

    <h3 className="text-slate-400">
      Estimated Time
    </h3>

    <p className="text-4xl font-bold mt-2">
    {totalDuration}
    </p>

<p className="text-slate-500 mt-2">
  Weeks
</p>
  </div>

  {/* Difficulty */}
  <div
    className="
      bg-slate-900/60
      backdrop-blur-xl
      border border-purple-500/20
      rounded-3xl
      p-6
      shadow-xl
      hover:scale-105
      transition-all
    "
  >
    <div className="text-4xl mb-3">📈</div>

    <h3 className="text-slate-400">
      Difficulty
    </h3>

    <p className="text-4xl font-bold mt-2">
  {difficulty}
</p>

    <p className="text-slate-500 mt-2">
      Level
    </p>
  </div>

</div>


{loading && (

<div
  className="
    bg-slate-900/60
    backdrop-blur-xl
    border border-slate-700/40
    rounded-3xl
    p-8
    mb-10
  "
>

  <h2 className="text-3xl font-bold mb-8">
    🤖 Generating AI Roadmap...
  </h2>

  <div className="space-y-5">

    <div className="h-6 bg-slate-700 rounded animate-pulse w-3/4"></div>

    <div className="h-6 bg-slate-700 rounded animate-pulse w-2/3"></div>

    <div className="h-6 bg-slate-700 rounded animate-pulse w-5/6"></div>

    <div className="h-6 bg-slate-700 rounded animate-pulse w-1/2"></div>

  </div>

</div>

)}


{roadmapData.length > 0 && (

<div
  className="
    bg-slate-900/60
    backdrop-blur-xl
    border border-cyan-500/20 shadow-[0_0_25px_rgba(34,211,238,0.08)]
    rounded-3xl
    p-8
    shadow-2xl
    mb-10
  "
>

  <h2 className="text-3xl font-bold mb-8">
    🚀 Learning Roadmap
  </h2>


    <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">

  {roadmapData.map((step, index) => {

    const Icon =
      phaseIcons[index % phaseIcons.length];

    return (

      <div
        key={index}
        className="
          bg-slate-900/60
          backdrop-blur-xl
          rounded-3xl
          border
          border-cyan-500/20
          shadow-[0_0_25px_rgba(34,211,238,0.08)]
          p-6
          hover:scale-105
          transition-all
        "
      >

        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-slate-800/60
            border
            border-cyan-500/20
            flex
            items-center
            justify-center
            mb-4
          "
        >
          <Icon
            size={32}
            className="text-cyan-400"
          />
        </div>

        <div className="mb-3">

          <span
            className="
              text-cyan-400
              text-sm
              font-semibold
            "
          >
            Phase {index + 1}
          </span>

        </div>

        <h3
          className="
            text-xl
            font-bold
            text-white
          "
        >
          {step.title}
        </h3>

        <p className="text-cyan-400 mt-2">
          ⏱ {step.duration}
        </p>

        <p className="text-slate-400 mt-3">
          {step.description}
        </p>

      </div>

    );

  })}

</div>
</div>
)}
      </section>

    </main>

  );

}