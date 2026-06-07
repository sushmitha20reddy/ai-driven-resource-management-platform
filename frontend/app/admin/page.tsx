"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function AdminPage() {

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const response = await axios.get(
        "https://ai-platform-backend-5msg.onrender.com/admin-stats"
      );

      setStats(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <main className="min-h-screen  text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-10">
          Admin Dashboard 📊
        </h1>

        {stats && (

          <>

            <div className="grid grid-cols-3 gap-6 mb-10">

              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

                <h2 className="text-xl mb-3">
                  Total Quizzes
                </h2>

                <p className="text-4xl font-bold">
                  {stats.total_quizzes}
                </p>

              </div>

              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

                <h2 className="text-xl mb-3">
                  Average Score
                </h2>

                <p className="text-4xl font-bold">
                  {Number(stats.average_score).toFixed(2)}%
                </p>

              </div>

              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

                <h2 className="text-xl mb-3">
                  Best Score
                </h2>

                <p className="text-4xl font-bold">
                  {Number(stats.best_score).toFixed(2)}%
                </p>

              </div>

            </div>

            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">

              <h2 className="text-3xl font-bold mb-6">
                Recent Quiz Attempts
              </h2>

              <table className="w-full">

                <thead>

                  <tr className="border-b border-gray-700">

                    <th className="text-left py-3">
                      Email
                    </th>

                    <th className="text-left py-3">
                      Subject
                    </th>

                    <th className="text-left py-3">
                      Score
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {stats.recent_results.map(
                    (result: any, index: number) => (

                      <tr
                        key={index}
                        className="border-b border-gray-800"
                      >

                        <td className="py-3">
                          {result.email}
                        </td>

                        <td className="py-3">
                          {result.subject}
                        </td>

                        <td className="py-3">
                          {result.percentage}%
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </>

        )}

      </section>

    </main>

  );

}