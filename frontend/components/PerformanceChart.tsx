"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PerformanceChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const email =
          localStorage.getItem("user_email");

        console.log(
          "Chart Email:",
          email
        );

        if (!email) {
          setLoading(false);
          return;
        }

        const API_URL =
          "https://ai-platform-backend-5msg.onrender.com";

        const response =
          await axios.get(
            `${API_URL}/chart-data/${email}`
          );

        console.log(
          "Chart Response:",
          response.data
        );

        setData(response.data || []);
      } catch (error) {
        console.error(
          "Chart Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="h-[350px] flex items-center justify-center text-slate-400">
        Loading Chart...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center text-slate-400">
        No Quiz Data Available
      </div>
    );
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <LineChart data={data}>
        <CartesianGrid
          stroke="#1e293b"
          strokeDasharray="5 5"
        />

        <XAxis
          dataKey="quiz"
          stroke="#94a3b8"
        />

        <YAxis
          stroke="#94a3b8"
          domain={[0, 100]}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "12px",
            color: "#fff",
          }}
        />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#3b82f6"
          strokeWidth={4}
          dot={{
            r: 6,
            fill: "#3b82f6",
          }}
          activeDot={{
            r: 8,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}