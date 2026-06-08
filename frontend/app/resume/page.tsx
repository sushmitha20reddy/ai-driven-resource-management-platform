"use client";

import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);

  const [analysis, setAnalysis] = useState("");

  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState(0);

  const [skillsFound, setSkillsFound] = useState<string[]>([]);

  const [strengths, setStrengths] = useState<string[]>([]);

  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [missingSkills, setMissingSkills] = useState<string[]>([]);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const API_URL = "https://ai-platform-backend-5msg.onrender.com";

      const response = await axios.post(`${API_URL}/analyze-resume`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setScore(response.data.score || 0);

      setSkillsFound(response.data.skills_found || []);

      setMissingSkills(response.data.missing_skills || []);

      setStrengths(response.data.strengths || []);

      setWeaknesses(response.data.weaknesses || []);

      setSuggestions(response.data.suggestions || []);

      setAnalysis("completed");
    } catch (error) {
      console.error(error);

      alert("Resume analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <div className="mb-12">
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
            AI Resume Analyzer
          </h1>

          <p className="text-slate-400 text-lg">
            Upload your resume and receive AI-powered career insights
          </p>
        </div>

        <div
          className="
bg-slate-900/60
backdrop-blur-xl
border
border-slate-700/40
rounded-3xl
p-8
shadow-2xl
"
        >
          <div
            className="
  border-2
  border-dashed
  border-blue-500/30
  rounded-3xl
  p-12
  text-center
  bg-slate-900/30
"
          >
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
              className="mb-6"
            />

            <h3 className="text-2xl font-bold mb-3">Upload Resume</h3>

            <p className="text-slate-400 mb-6">PDF files only</p>

            <button
              onClick={analyzeResume}
              className="
      bg-gradient-to-r
      from-blue-600
      to-purple-600
      px-10
      py-4
      rounded-2xl
      font-semibold
      hover:scale-105
      transition-all
    "
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </div>

        {analysis && (

<div className="grid md:grid-cols-3 gap-6 mt-10">

  {/* ATS SCORE */}
  <div
    className="
      bg-slate-900/60
      backdrop-blur-xl
      rounded-3xl
      p-6
      border border-slate-700/40
      shadow-xl
    "
  >
    <div className="text-5xl mb-3">
      🎯
    </div>

    <h3 className="text-lg text-slate-400">
      ATS Score
    </h3>

    <div className="text-5xl font-bold text-green-400 mt-3">
      {score}%
    </div>

    <div className="w-full bg-slate-800 h-3 rounded-full mt-4">
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{ width: `${score}%` }}
      />
    </div>
  </div>

  {/* SKILLS FOUND */}
  <div
    className="
      bg-slate-900/60
      backdrop-blur-xl
      rounded-3xl
      p-6
      border border-slate-700/40
      shadow-xl
    "
  >
    <div className="text-5xl mb-3">
      💼
    </div>

    <h3 className="text-lg text-slate-400">
      Skills Found
    </h3>

    <div className="text-5xl font-bold text-blue-400 mt-3">
      {skillsFound.length}
    </div>

    <p className="text-slate-500 mt-3">
      Skills detected in resume
    </p>
  </div>

  {/* MISSING SKILLS */}
  <div
    className="
      bg-slate-900/60
      backdrop-blur-xl
      rounded-3xl
      p-6
      border border-slate-700/40
      shadow-xl
    "
  >
    <div className="text-5xl mb-3">
      ⚠️
    </div>

    <h3 className="text-lg text-slate-400">
      Missing Skills
    </h3>

    <div className="text-5xl font-bold text-red-400 mt-3">
      {missingSkills.length}
    </div>

    <p className="text-slate-500 mt-3">
      Skills recommended to learn
    </p>
  </div>

</div>

)}

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Strengths */}
          <div
            className="
    bg-slate-900/60
    backdrop-blur-xl
    rounded-3xl
    p-6
    border border-slate-700/40
  "
          >
            <h3 className="text-xl font-bold mb-4">💪 Strengths</h3>

            <ul className="space-y-2">
              {strengths.map((item, index) => (
                <li key={index} className="text-green-300">
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div
            className="
    bg-slate-900/60
    backdrop-blur-xl
    rounded-3xl
    p-6
    border border-slate-700/40
  "
          >
            <h3 className="text-xl font-bold mb-4">⚠️ Weaknesses</h3>

            <ul className="space-y-2">
              {weaknesses.map((item, index) => (
                <li key={index} className="text-red-300">
                  ❌ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div
            className="
    bg-slate-900/60
    backdrop-blur-xl
    rounded-3xl
    p-6
    border border-slate-700/40
  "
          >
            <h3 className="text-xl font-bold mb-4">🚀 Suggestions</h3>

            <ul className="space-y-2">
              {suggestions.map((item, index) => (
                <li key={index} className="text-cyan-300">
                  💡 {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
