"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);

  const [name, setName] =
    useState("Sushmitha Reddy");

  const [role, setRole] =
    useState("AI Engineer");

  const fetchProfile = async () => {
  try {

    const API_URL =
      "https://ai-platform-backend-5msg.onrender.com";

    const response = await axios.get(
      `${API_URL}/profile/test@gmail.com`
    );

    setProfile(response.data);

  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {

    fetchProfile();

    const savedName =
      localStorage.getItem(
        "profile_name"
      );

    const savedRole =
      localStorage.getItem(
        "profile_role"
      );

    if (savedName) {
      setName(savedName);
    }

    if (savedRole) {
      setRole(savedRole);
    }

  }, []);

  return (
    <main className="min-h-screen  text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-10">
          My Profile 👤
        </h1>

        <div
          className="
            bg-[#0f172a]
            border border-gray-800
            rounded-3xl
            p-8
            mb-8
            flex
            justify-between
            items-center
          "
        >

          <div className="flex items-center gap-6">

            <div
              className="
                w-24
                h-24
                rounded-full
                bg-gradient-to-r
                from-blue-500
                to-purple-600
                flex
                items-center
                justify-center
                text-4xl
                font-bold
              "
            >
              {name.charAt(0)}
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {name}
              </h1>

              <p className="text-gray-400 mt-1">
                {role}
              </p>

              

            </div>

          </div>

          <button
            onClick={() =>
              router.push("/profile/edit")
            }
            className="
              px-6
              py-3
              bg-blue-600
              rounded-xl
              hover:bg-blue-700
              transition
            "
          >
            Edit Profile
          </button>

        </div>

      </section>

    </main>
  );
}