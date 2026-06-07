"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  const handleSave = () => {

    localStorage.setItem(
      "profile_name",
      name
    );

    localStorage.setItem(
      "profile_role",
      role
    );

    alert(
      "Profile Updated Successfully!"
    );

    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-6">
        Edit Profile
      </h1>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Full Name"
        className="
          w-full
          p-4
          bg-gray-900
          rounded-xl
          mb-4
        "
      />

      <input
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        placeholder="Role"
        className="
          w-full
          p-4
          bg-gray-900
          rounded-xl
          mb-4
        "
      />

      <button
        onClick={handleSave}
        className="
          bg-blue-600
          px-6
          py-3
          rounded-xl
          hover:bg-blue-700
        "
      >
        Save Changes
      </button>

    </div>
  );
}