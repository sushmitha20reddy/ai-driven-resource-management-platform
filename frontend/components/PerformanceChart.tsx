"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PerformanceChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const API_URL =
  "https://ai-platform-backend-5msg.onrender.com";
  axios.get(`${API_URL}/chart-data`)
      .then((res) => {

        setData(res.data);

      });

  }, []);

  return (

    <ResponsiveContainer width="100%" height={350}>
  <LineChart data={data}>
    <CartesianGrid
      stroke="#1e293b"
      strokeDasharray="5 5"
    />

    <XAxis
      dataKey="date"
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
        color: "#fff"
      }}
    />

    <Line
      type="natural"
      dataKey="average"
      stroke="#3b82f6"
      strokeWidth={5}
      dot={{
        r: 6,
        fill: "#3b82f6"
      }}
      activeDot={{
        r: 8
      }}
    />
  </LineChart>
</ResponsiveContainer>
)}