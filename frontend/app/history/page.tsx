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
      localStorage.getItem("user_email");

    if (!email) return;

    const response = await axios.get(
      `https://ai-platform-backend-5msg.onrender.com/results/${email}`
    );

    setResults(response.data);

  } catch (error) {

    console.error(error);

  }
};

  return (
    <main className="min-h-screen text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

  <h1 className="text-6xl font-extrabold mb-10">
    Quiz History 📊
  </h1>

  {/* Stats Cards */}

  <div className="grid md:grid-cols-3 gap-8 mb-10">

    <div
      className="
        bg-slate-900/60
        backdrop-blur-xl
        border border-purple-500/20
        rounded-3xl
        p-6
        flex items-center gap-5
      "
    >
      <div
        className="
          w-20 h-20
          rounded-3xl
          bg-purple-500/10
          border border-purple-500/30
          flex items-center justify-center
          text-4xl
        "
      >
        📋
      </div>

      <div>
        <p className="text-slate-400">
          Attempts
        </p>

        <h2 className="text-5xl font-bold text-purple-400">
          {results.length}
        </h2>
      </div>
    </div>

    <div
      className="
        bg-slate-900/60
        backdrop-blur-xl
        border border-green-500/20
        rounded-3xl
        p-6
        flex items-center gap-5
      "
    >
      <div
        className="
          w-20 h-20
          rounded-3xl
          bg-green-500/10
          border border-green-500/30
          flex items-center justify-center
          text-4xl
        "
      >
        🏆
      </div>

      <div>
        <p className="text-slate-400">
          Best Score
        </p>

        <h2 className="text-5xl font-bold text-green-400">
          {Math.max(
            ...results.map((r) => r.percentage),
            0
          ).toFixed(0)}%
        </h2>
      </div>
    </div>

    <div
      className="
        bg-slate-900/60
        backdrop-blur-xl
        border border-blue-500/20
        rounded-3xl
        p-6
        flex items-center gap-5
      "
    >
      <div
        className="
          w-20 h-20
          rounded-3xl
          bg-blue-500/10
          border border-blue-500/30
          flex items-center justify-center
          text-4xl
        "
      >
        📘
      </div>

      <div>
        <p className="text-slate-400">
          Subjects
        </p>

        <h2 className="text-5xl font-bold text-blue-400">
          {
            new Set(
              results.map((r) => r.subject)
            ).size
          }
        </h2>
      </div>
    </div>

  </div>

  {/* Table will go here next */}

<div
  className="
    bg-slate-900/60
    backdrop-blur-xl
    border border-cyan-500/20
    rounded-3xl
    overflow-hidden
    shadow-[0_0_25px_rgba(34,211,238,0.08)]
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
        <th className="p-6 text-left">
          Subject
        </th>

        <th className="p-6 text-left">
          Score
        </th>

        <th className="p-6 text-left">
          Percentage
        </th>

        <th className="p-6 text-left">
          Status
        </th>
      </tr>

    </thead>

    <tbody>

      {results.length === 0 ? (

        <tr>

          <td
            colSpan={4}
            className="
              text-center
              p-16
              text-slate-400
            "
          >

            <div className="text-6xl mb-4">
              📋
            </div>

            <h3 className="text-2xl font-bold text-white">
              No Quiz History Yet
            </h3>

            <p className="mt-3">
              Generate quizzes and complete them
              to see your learning analytics.
            </p>

          </td>

        </tr>

      ) : (

        results.map((item: any) => (

          <tr
            key={item.id}
            className="
              border-t
              border-slate-700/40
              hover:bg-cyan-500/5
              transition-all
            "
          >

            <td className="p-6">

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-purple-500/20
                    to-cyan-500/20
                    border
                    border-cyan-500/20
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                  "
                >
                  📚
                </div>

                <div>

                  <p className="font-bold text-lg">
                    {item.subject}
                  </p>

                  <p className="text-slate-400 text-sm">
                    Quiz Attempt
                  </p>

                </div>

              </div>

            </td>

            <td className="p-6">

              <span
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-purple-500/10
                  border
                  border-purple-500/20
                  text-purple-300
                  font-semibold
                "
              >
                {item.score}
              </span>

            </td>

            <td className="p-6">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    border-4
                    border-cyan-500
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-bold
                  "
                >
                  {item.percentage.toFixed(0)}%
                </div>

              </div>

            </td>

            <td className="p-6">

              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  ${
                    item.percentage >= 80
                      ? "bg-green-500/20 text-green-400"
                      : item.percentage >= 60
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }
                `}
              >
                {
                  item.percentage >= 80
                    ? "Excellent"
                    : item.percentage >= 60
                    ? "Good"
                    : "Needs Improvement"
                }
              </span>

            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>

<div
  className="
    mt-10
    bg-slate-900/60
    backdrop-blur-xl
    border border-cyan-500/20
    rounded-3xl
    p-8
  "
>

  <h2 className="text-3xl font-bold mb-6">
    📈 Performance Analytics
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div>
      <p className="text-slate-400">
        Average Score
      </p>

      <h3 className="text-5xl font-bold text-cyan-400 mt-2">
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
      </h3>
    </div>

    <div>
      <p className="text-slate-400">
        Best Subject
      </p>

      <h3 className="text-3xl font-bold text-green-400 mt-2">
        {results[0]?.subject || "-"}
      </h3>
    </div>

    <div>
      <p className="text-slate-400">
        Total Quizzes
      </p>

      <h3 className="text-5xl font-bold text-purple-400 mt-2">
        {results.length}
      </h3>
    </div>

  </div>

</div>

<div
  className="
    mt-8
    bg-gradient-to-r
    from-blue-900/40
    to-purple-900/40
    border border-cyan-500/20
    rounded-3xl
    p-8
    text-center
  "
>

  <div className="text-6xl mb-4">
    🚀
  </div>

  <h2 className="text-3xl font-bold">
    Keep Learning!
  </h2>

  <p className="text-slate-400 mt-3">
    Every quiz improves your skills and
    prepares you for interviews.
  </p>

</div>

</section>
    </main>
  );
}