"use client";

import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const phaseIcons = [
  "🐍",
  "📚",
  "🗄️",
  "🤖",
  "🧠",
  "🚀",
  "⚙️",
  "💼"
];

export default function RoadmapPage() {

  const [goal, setGoal] = useState("");


const [roadmapData, setRoadmapData] = useState<any[]>([
  "Learn Python Fundamentals",
  "Master Data Structures & Algorithms",
  "Learn SQL & Databases",
  "Study Machine Learning",
  "Deep Learning & Neural Networks",
  "Build AI Projects",
  "Learn MLOps & Deployment",
  "Apply for AI Engineer Roles"
]);

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

    <p className="text-3xl font-bold mt-2">
      AI Engineer
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
      8
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
      6-9
    </p>

    <p className="text-slate-500 mt-2">
      Months
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
      Medium
    </p>

    <p className="text-slate-500 mt-2">
      Level
    </p>
  </div>

</div>

<div
 className="
 bg-slate-900/60
 backdrop-blur-xl
 border border-slate-700/40
 rounded-3xl
 p-6
 mb-8
 "
>

<h2 className="text-xl font-bold mb-4">
📊 Roadmap Progress
</h2>

<div className="w-full bg-slate-800 h-4 rounded-full">

<div
 className="
 bg-gradient-to-r
 from-blue-500
 to-purple-500
 h-4
 rounded-full
 "
 style={{
  width: "35%"
 }}
/>

</div>

<p className="text-slate-400 mt-3">
35% Complete
</p>

</div>


{roadmapData.length > 0 && (

<div
  className="
    bg-slate-900/60
    backdrop-blur-xl
    border border-slate-700/40
    rounded-3xl
    p-8
    shadow-2xl
    mb-10
  "
>

  <h2 className="text-3xl font-bold mb-8">
    🚀 Learning Roadmap
  </h2>

  <div className="space-y-6">

    {roadmapData.map((step, index) => (

      <div
  key={index}
  className="
    flex
    items-start
    gap-6
    relative
  "
>

        {/* Number Circle */}

        {index !== roadmapData.length - 1 && (

  <div
    className="
      absolute
      left-8
      top-16
      w-1
      h-20
      rounded-full
      bg-gradient-to-b
      from-cyan-500
      via-blue-500
      to-purple-500
      opacity-80
      shadow-[0_0_20px_rgba(59,130,246,0.8)]
    "
  />

)}

<div className="relative">

  <div
    className="
      absolute
      inset-0
      bg-cyan-500/40
      blur-xl
      rounded-full
      animate-pulse
    "
  />

  <div
    className="
      relative
      w-16
      h-16
      rounded-full
      bg-gradient-to-r
      from-cyan-500
      to-blue-600
      flex
      items-center
      justify-center
      text-xl
      font-bold
      shadow-2xl
    "
  >
    {index + 1}
  </div>

</div>

        {/* Card */}

       <div
  className={`
    flex-1
    rounded-2xl
    p-6
    transition-all
    duration-300
    hover:scale-[1.03]
    hover:-translate-y-1
    hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]
    hover:scale-[1.02]
    ${
      [
        "bg-blue-500/10 border border-blue-500/30 hover:border-cyan-400",
        "bg-green-500/10 border border-green-500/30 hover:border-cyan-400",
        "bg-purple-500/10 border border-purple-500/30 hover:border-cyan-400",
        "bg-pink-500/10 border border-pink-500/30 hover:border-cyan-400",
        "bg-orange-500/10 border border-orange-500/30 hover:border-cyan-400",
        "bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400",
        "bg-yellow-500/10 border border-yellow-500/30 hover:border-cyan-400",
        "bg-red-500/10 border border-red-500/30 hover:border-cyan-400"
      ][index % 8]
    }
  `}
>

  <div className="flex items-center justify-between mb-4">

  <span
    className="
      px-3
      py-1
      rounded-full
      bg-cyan-500/20
      text-cyan-300
      text-sm
      font-semibold
    "
  >
    Phase {index + 1}
  </span>

  <div
    className="
      w-8
      h-8
      rounded-full
      bg-green-500/20
      flex
      items-center
      justify-center
      text-green-400
      font-bold
    "
  >
    ✓
  </div>

</div>


<div
  className="
    w-16
    h-16
    rounded-2xl
    flex
    items-center
    justify-center
    text-4xl
    bg-slate-900/60
    border
    border-slate-700/40
    mb-4
    shadow-lg
  "
>
  {phaseIcons[index % phaseIcons.length]}
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
  {step.duration}
</p>

<p className="text-slate-400 mt-3">
  {step.description}
</p>

<div className="w-full bg-slate-800 h-2 rounded-full mt-3">

  <div
    className="
      bg-gradient-to-r
      from-cyan-500
      to-blue-500
      h-2
      rounded-full
    "
  />

</div>

  <p className="text-slate-400 mt-3">
  Recommended learning topic for this phase.
</p>

</div>

      </div>

    ))}

  </div>

</div>

)}

      </section>

    </main>

  );

}