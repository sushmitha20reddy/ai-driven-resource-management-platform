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

  const [authenticated, setAuthenticated] = useState(false);

  const [analytics, setAnalytics] = useState<any>(null);

  const [activities, setActivities] = useState<any[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [search, setSearch] = useState("");

  const API_URL =
  "https://ai-platform-backend-5msg.onrender.com";

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics`);

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_URL}/recent-activity`);

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
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setAuthenticated(true);

      fetchAnalytics();
      fetchActivities();
    }
  }, []);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Checking authentication...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex">
      {sidebarOpen && <Sidebar />}

      <section className="flex-1 p-10">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-10">
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
    w-[500px]
    text-white
  "
            />
          </div>
          <div className="flex items-center gap-5">
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
      w-12 h-12
      rounded-full
      bg-green-600
      flex items-center justify-center
      font-bold
    "
              >
                S
              </div>

              <div>
                <p className="font-semibold">Sushmitha</p>

                <p className="text-gray-400 text-sm">Student</p>
              </div>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">Welcome Back 👋</h1>

          <p className="text-gray-400 text-lg">
            AI-Driven Intelligent Resource Management Platform
          </p>
        </div>
        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div
            className="bg-gradient-to-r
                from-blue-600
                to-blue-800
                p-8
                rounded-2xl
                hover:scale-105
                transition-all
                shadow-lg
                hover:shadow-blue-500/30"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg">Total Quizzes</h3>

              <BarChart3 size={28} />
            </div>

            <p className="text-4xl font-bold">
              {analytics ? analytics.total_quizzes : 0}
            </p>
          </div>

          <div
            className="
            bg-gradient-to-r
            from-green-600
            to-green-800
            p-8
            rounded-2xl
            hover:scale-105
            transition-all
            shadow-lg
            hover:shadow-green-500/30
            "
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg">Average Score</h3>

              <TrendingUp size={28} />
            </div>

            <p className="text-4xl font-bold tracking-tight">
              {analytics ? Number(analytics.average_percentage).toFixed(2) : 0}%
            </p>
          </div>

          <div
            className="
  bg-gradient-to-r
  from-purple-600
  to-purple-800
  p-8
  rounded-2xl
  hover:scale-105
  transition-all
  shadow-lg
  hover:shadow-purple-500/30
"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg">Best Score</h3>

              <Trophy size={28} />
            </div>

            <p className="text-4xl font-bold tracking-tight">
              {analytics ? Number(analytics.best_score).toFixed(2) : 0}%
            </p>
          </div>

          <div
            className="
  bg-gradient-to-r
  from-cyan-600
  to-blue-800
  p-8
  rounded-2xl
  hover:scale-105
  transition-all
  shadow-lg
  hover:shadow-cyan-500/30
"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg">Subjects</h3>

              <BookOpen size={28} />
            </div>

            <p className="text-6xl font-bold tracking-tight">2</p>
          </div>
        </div>
        {/* CHART + ACTIVITY */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div
            className="
              lg:col-span-2
              bg-[#0f172a]
              border border-gray-800
              rounded-2xl
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>

            <PerformanceChart />
          </div>

          <div
            className="
              bg-[#0f172a]
              border border-gray-800
              rounded-2xl
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-5">Recent Activity</h2>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="
                      bg-gray-800
                      p-4
                      rounded-xl
                    "
                >
                  ✅ {activity.subject}
                  {" - "}
                  {activity.percentage}%
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* QUICK ACTIONS */}
        <div
          className="
            mt-8
            bg-[#0f172a]
            border border-gray-800
            rounded-2xl
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions 🚀</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => router.push("/chat")}
              className="
                    bg-blue-600
                    p-4
                    rounded-xl
                    hover:scale-105
                    transition-all
                  "
            >
              AI Assistant
            </button>

            <button
              onClick={() => router.push("/quiz")}
              className="
                    bg-green-600
                    p-4
                    rounded-xl
                    hover:scale-105
                    transition-all
                  "
            >
              Generate Quiz
            </button>

            <button
              onClick={() => router.push("/resources")}
              className="
                    bg-purple-600
                    p-4
                    rounded-xl
                    hover:scale-105
                    transition-all
                  "
            >
              Resources
            </button>

            <button
              onClick={() => router.push("/roadmap")}
              className="
                    bg-orange-600
                    p-4
                    rounded-xl
                    hover:scale-105
                    transition-all
                  "
            >
              AI Roadmap
            </button>
          </div>
        </div>{" "}
        {/* closes Quick Actions */}
      </section>
    </main>
  );
}
