"use client";

import { useState } from "react";
import axios from "axios";

export default function ResumePage() {

  const [file, setFile] = useState<File | null>(null);

  const [analysis, setAnalysis] = useState("");

  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {

    if (!file) {

      alert("Please select a resume");

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const API_URL =
  "https://ai-platform-backend-5msg.onrender.com";

const response = await axios.post(
  `${API_URL}/analyze-resume`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);
      setAnalysis(
        response.data.analysis
      );

    } catch (error) {

      console.error(error);

      alert("Resume analysis failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        AI Resume Analyzer 🚀
      </h1>

      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {

            if (e.target.files) {

              setFile(
                e.target.files[0]
              );
            }

          }}
          className="mb-6"
        />

        <button
          onClick={analyzeResume}
          className="bg-blue-600 px-8 py-4 rounded-xl"
        >
          {
            loading
            ? "Analyzing..."
            : "Analyze Resume"
          }
        </button>

      </div>

      {
        analysis && (

          <div className="mt-10 bg-gray-900 p-8 rounded-2xl border border-gray-800">

            <h2 className="text-3xl font-bold mb-6">
              Analysis Result
            </h2>

            <pre className="whitespace-pre-wrap text-gray-300">
              {analysis}
            </pre>

          </div>

        )
      }

    </main>
  );
}