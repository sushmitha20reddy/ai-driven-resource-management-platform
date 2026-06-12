"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BarChart3, TrendingUp, Trophy, BookOpen } from "lucide-react";
import { Bell, Menu } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import PerformanceChart from "../../components/PerformanceChart";

export default function DashboardPage() {
  const router = useRouter();

  const [analytics, setAnalytics] = useState({
    total_quizzes: 0,
    average_percentage: 0,
    best_score: 0,
    subjects: 0,
  });

  const [activities, setActivities] = useState<any[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("user_email");

    console.log("Dashboard Email =", email);

    if (email) {
      setUserEmail(email);
    }
  }, []);

  const API_URL = "https://ai-platform-backend-5msg.onrender.com";

  const fetchAnalytics = async () => {
    try {
      const email = localStorage.getItem("user_email");

      const response = await axios.get(`${API_URL}/analytics/${email}`);

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivities = async () => {
    try {
      const email = localStorage.getItem("user_email");

      const response = await axios.get(`${API_URL}/recent-activity/${email}`);

      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const value = search.toLowerCase();

    if (value.includes("quiz")) {
      router.push("/quiz");
    } else if (value.includes("assistant")) {
      router.push("/chat");
    } else if (value.includes("resume")) {
      router.push("/resume");
    } else if (value.includes("roadmap")) {
      router.push("/roadmap");
    } else if (value.includes("resource")) {
      router.push("/resources");
    } else if (value.includes("profile")) {
      router.push("/profile");
    }
  };

  useEffect(() => {
    fetchAnalytics();
    fetchActivities();
  }, []);

  return (
    <main className="h-screen bg-black text-white flex overflow-y-auto">
      {sidebarOpen && <Sidebar />}

      <section className="flex-1 p-4 md:p-10">
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="
    bg-[#0f172a]
    border
    border-gray-800
    p-3
    rounded-xl
  "
            >
              <Menu size={22} />
            </button>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search anything..."
              className="
    bg-[#0f172a]
    border border-gray-800
    rounded-xl
    px-5 py-3
    w-full md:w-[500px]
    text-white
  "
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => router.push("/notifications")}
              className="
    bg-[#0f172a]
    border border-gray-800
    p-3
    rounded-xl
    relative
    hover:bg-gray-800
    transition
  "
            >
              <Bell size={22} />

              <span
                className="
      absolute
      top-2
      right-2
      w-2
      h-2
      bg-red-500
      rounded-full
    "
              />
            </button>
            <div
              onClick={() => router.push("/profile")}
              className="
    flex
    items-center
    gap-4
    cursor-pointer
    hover:bg-[#0f172a]
    px-3
    py-2
    rounded-xl
    transition
  "
            >
              <div
                className="
    w-14
    h-14
    rounded-full
    bg-green-500
    flex
    items-center
    justify-center
    text-xl
    font-bold
  "
              >
                {userEmail ? userEmail.charAt(0).toUpperCase() : "G"}
              </div>

              <div>
                <h3 className="font-bold">
                  {userEmail ? userEmail.split("@")[0] : "Guest"}
                </h3>

                <p className="text-gray-400 text-sm">Student</p>
              </div>
            </div>
          </div>
        </div>
        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>

          <p className="text-gray-400 text-lg">
            AI-Driven Intelligent Resource Management Platform
          </p>
        </div>
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div
            className="
  bg-gradient-to-br
  from-blue-600
  to-blue-800
  rounded-3xl
  p-4
  shadow-xl
  hover:scale-105
  transition-all
"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Total Quizzes</h3>

              <span className="text-4xl">📊</span>
            </div>

            <h2 className="text-2xl font-bold">{analytics.total_quizzes}</h2>
          </div>

          <div
            className="
  bg-gradient-to-br
  from-green-600
  to-green-800
  rounded-3xl
  p-4
  shadow-xl
  hover:scale-105
  transition-all
"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Average Score</h3>

              <span className="text-4xl">📈</span>
            </div>

            <h2 className="text-4xl font-bold">
              {analytics.average_percentage.toFixed(0)}%
            </h2>
          </div>

          <div
            className="
  bg-gradient-to-br
  from-purple-600
  to-purple-900
  rounded-3xl
  p-4
  shadow-xl
  hover:scale-105
  transition-all
"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Best Score</h3>

              <span className="text-4xl">🏆</span>
            </div>

            <h2 className="text-4xl font-bold">
              {Number(analytics.best_score).toFixed(0)}%
            </h2>
          </div>

          <div
            className="
  bg-gradient-to-br
  from-cyan-600
  to-blue-700
  rounded-3xl
  p-4
  shadow-xl
  hover:scale-105
  transition-all
"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Subjects</h3>

              <span className="text-4xl">📚</span>
            </div>

            <h2 className="text-4xl font-bold">{analytics.subjects || 0}</h2>
          </div>
        </div>
        {/* CHART + ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div
            className="
              lg:col-span-2
              bg-[#0f172a]
              border border-gray-800
              rounded-2xl
              p-4
            "
          >
            <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>

           <div className="h-[280px]">
  <PerformanceChart />
</div>
          </div>

          <div
            className="
              bg-[#0f172a]
              border border-gray-800
              rounded-2xl
              p-4
            "
          >
            <h2 className="text-2xl font-bold mb-5">Recent Activity</h2>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div className="space-y-4">
                  <div className="space-y-4">
  {activities.length === 0 ? (
    <p className="text-slate-400">
      No Activity Yet
    </p>
  ) : (
    activities.map((activity, index) => (
      <div
        key={index}
        className="
          bg-slate-800
          rounded-xl
          p-4
        "
      >
        <p>✅ {activity.subject}</p>

        <p className="text-slate-400">
          {activity.percentage}%
        </p>
      </div>
    ))
  )}
</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
