"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
      flex
      justify-between
      items-center
      px-10
      py-6
      border-b
      border-gray-800
      "
    >

      <Link
        href="/"
        className="text-3xl font-bold"
      >
        AI Platform 🚀
      </Link>

      <div className="flex items-center gap-6">

        <Link href="/">
          Home
        </Link>

        <Link href="/login">
          Login
        </Link>

        <Link href="/signup">
          Signup
        </Link>

      </div>

    </nav>
  );
}