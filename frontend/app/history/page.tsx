"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryPage() {

const [results, setResults] = useState<any[]>([]);

  useEffect(() => {

    fetchResults();

  }, []);

  const fetchResults = async () => {
  try {

    const email = "test@gmail.com";

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
    <main className="min-h-screen text-black p-10">

<h1 className="text-5xl font-bold text-white mb-4">
          Quiz History 📊
      </h1>

<div className="grid md:grid-cols-3 gap-6 mb-10">

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h3 className="text-gray-400">Attempts</h3>
    <p className="text-3xl font-bold text-orange-100">
      {results.length}
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h3 className="text-gray-400">Best Score</h3>
    <p className="text-3xl font-bold text-green-400">
      100%
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl">
    <h3 className="text-gray-400">Subjects</h3>
    <p className="text-3xl font-bold text-blue-400">
      2
    </p>
  </div>

</div>

<table
  className="
  w-full
  overflow-hidden
  rounded-3xl
  bg-slate-900/70
  backdrop-blur-md
  "
>
          <thead>

<tr className="bg-slate-900 text-white">
            <th className="p-4">Subject</th>
            <th className="p-4">Score</th>
            <th className="p-4">Percentage</th>

          </tr>

        </thead>

        <tbody>
  {results.length === 0 ? (
    <tr>
      <td
        colSpan={3}
        className="text-center p-8 text-gray-400"
      >
        No quiz history found 📭
      </td>
    </tr>
  ) : (
    results.map((item: any) => (
     <tr
  key={item.id}
  className="
    border-t
    border-slate-700
    text-white
    hover:bg-slate-800/50
    transition-all
  "
>
<td className="p-4 text-white">
              {item.subject}
        </td>

<td className="p-4 text-white">
              {item.score}
        </td>

<td className="p-4 text-white">
              {item.percentage.toFixed(2)}%
        </td>
      </tr>
    ))
  )}
</tbody>
      </table>

    </main>
  );
}