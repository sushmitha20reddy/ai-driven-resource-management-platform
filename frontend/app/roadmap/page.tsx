"use client";

import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function RoadmapPage() {

  const [goal, setGoal] = useState("");

  const [roadmap, setRoadmap] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generateRoadmap = async () => {

    try {

      setLoading(true);

      const response =
        await axios.post(
          "https://ai-platform-backend-5msg.onrender.com/generate-roadmap",
          {
            goal
          }
        );

      setRoadmap(
        response.data.roadmap
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to generate roadmap"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen  text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-6">
          AI Learning Roadmap 🚀
        </h1>

        <input
          value={goal}
          onChange={(e) =>
            setGoal(e.target.value)
          }
          placeholder="Example: Become AI Engineer"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 mb-5"
        />

        <button
          onClick={generateRoadmap}
          className="bg-blue-600 px-8 py-4 rounded-xl"
        >
          {
            loading
            ? "Generating..."
            : "Generate Roadmap"
          }
        </button>

        {

          roadmap && (

            <div className="mt-10 bg-gray-900 p-8 rounded-2xl border border-gray-800">

              <pre className="whitespace-pre-wrap">
                {roadmap}
              </pre>

            </div>

          )

        }

      </section>

    </main>

  );

}