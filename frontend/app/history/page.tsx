"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/Sidebar";

export default function HistoryPage() {

const [results, setResults] = useState<any[]>([]);

  useEffect(() => {

    fetchResults();

  }, []);

  const fetchResults = async () => {
  try {

const email =
  localStorage.getItem("email");

    const response = await axios.get(
      `https://ai-platform-backend-5msg.onrender.com/results/${email}`
    );

    console.log("RESULTS =", response.data);

    setResults(response.data);

  } catch (error) {
    console.error(error);
  }
};

  return (
<main className="min-h-screen text-white flex">

  <Sidebar />

  <section className="flex-1 p-10">

<h1 className="text-5xl font-bold text-white mb-4">
          Quiz History 📊
      </h1>

<div className="grid md:grid-cols-4 gap-6 mb-10">

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h3 className="text-gray-400">Attempts</h3>
    <p className="text-3xl font-bold text-orange-100">
      {results.length}
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h3 className="text-gray-400">Best Score</h3>
    <p className="text-3xl font-bold text-green-400">
      Math.max(
  ...results.map((r) => r.percentage),
  0
).toFixed(0) + "%"
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h3 className="text-gray-400">Subjects</h3>
    <p className="text-3xl font-bold text-blue-400">
      new Set(
  results.map((r) => r.subject)
).size
    </p>
  </div>

  <div
  className="
    bg-slate-900/60
    backdrop-blur-xl
    p-6
    rounded-3xl
  "
>
  <h3 className="text-slate-400">
    Average Score
  </h3>

  <p className="text-3xl font-bold text-cyan-400">
    {
      results.length
        ? (
            results.reduce(
              (a, b) => a + b.percentage,
              0
            ) / results.length
          ).toFixed(0)
        : 0
    }%
  </p>
</div>

</div>

<div
  className="
    bg-slate-900/60
    backdrop-blur-xl
    rounded-3xl
    border
    border-cyan-500/20
    shadow-[0_0_25px_rgba(34,211,238,0.08)]
    overflow-hidden
  "
>

  <table className="w-full">

    <thead>

      <tr
        className="
          bg-slate-950/80
          text-white
        "
      >
        <th className="p-5 text-left">
          Subject
        </th>

        <th className="p-5 text-left">
          Score
        </th>

        <th className="p-5 text-left">
          Percentage
        </th>
      </tr>

    </thead>

    <tbody>

      {results.length === 0 ? (

        <tr>

          <td
            colSpan={3}
            className="
              text-center
              p-12
              text-slate-400
            "
          >
            <div className="text-5xl mb-4">
              📋
            </div>

            <p className="text-xl font-semibold">
              No Quiz History Yet
            </p>

            <p className="mt-2">
              Generate and complete quizzes
              to start tracking progress.
            </p>

          </td>

        </tr>

      ) : (

        results.map((item: any) => (

          <tr
            key={item.id}
            className="
              border-t
              border-slate-700/50
              text-white
              hover:bg-cyan-500/5
              transition-all
            "
          >

            <td className="p-5">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  📚
                </div>

                <span className="font-semibold">
                  {item.subject}
                </span>

              </div>

            </td>

            <td className="p-5">

              <span
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-purple-500/10
                  text-purple-300
                  border
                  border-purple-500/20
                "
              >
                {item.score}
              </span>

            </td>

            <td className="p-5">

              <span
                className="
                  text-cyan-400
                  font-bold
                  text-lg
                "
              >
                {item.percentage.toFixed(0)}%
              </span>

            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>

    </main>
  );
}
</section>
</main>