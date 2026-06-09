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

      console.log("EMAIL =", email);

      if (!email) {
        console.log("No user email found");
        return;
      }

      const response = await axios.get(
        `https://ai-platform-backend-5msg.onrender.com/results/${email}`
      );

      console.log(
        "RESULTS =",
        response.data
      );

      setResults(response.data);

    } catch (error) {

      console.error(
        "Failed to fetch history:",
        error
      );

    }
  };

  return (
    <main className="min-h-screen text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-4">
          Quiz History 📊
        </h1>

        {/* Rest of your stats cards and table */}

      </section>

    </main>
  );
}