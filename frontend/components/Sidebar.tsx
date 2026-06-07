"use client";

import { useRouter, usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Bot,
  FileQuestion,
  History,
  BookOpen,
  Map,
  FileText,
  User,
  Shield,
  LogOut
} from "lucide-react";

export default function Sidebar() {

  const router = useRouter();
  const pathname = usePathname();

  const mainMenu = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      label: "AI Assistant",
      path: "/chat",
      icon: Bot
    }
  ];

  const learningMenu = [
    {
      label: "Quiz Generator",
      path: "/quiz",
      icon: FileQuestion
    },
    {
      label: "Quiz History",
      path: "/history",
      icon: History
    },
    {
      label: "Study Resources",
      path: "/resources",
      icon: BookOpen
    },
    {
      label: "AI Roadmap",
      path: "/roadmap",
      icon: Map
    }
  ];

  const careerMenu = [
    {
      label: "Resume Analyzer",
      path: "/resume",
      icon: FileText
    }
  ];

  const accountMenu = [
    {
      label: "Profile",
      path: "/profile",
      icon: User
    },
    
  ];

  const renderMenu = (items: any[]) =>
    items.map((item) => {

      const Icon = item.icon;

      return (
        <button
          key={item.path}
          onClick={() => router.push(item.path)}
          className={`
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            transition-all
            ${
              pathname === item.path
                ? "bg-blue-600 text-white"
                : "bg-slate-950/70 backdrop-blur-md text-gray-300 hover:bg-gray-800"
            }
          `}
        >
          <Icon size={18} />

          <span>
            {item.label}
          </span>
        </button>
      );
    });

  return (

    <aside className="
      w-72
      bg-[#020617]
      border-r
      border-gray-800
      p-6
      flex
      flex-col
    ">

      <h1 className="
        text-3xl
        font-bold
        text-white
        mb-8
      ">
        AI Platform 🚀
      </h1>

      <div className="space-y-6 flex-1">

        <div>

          <p className="
            text-xs
            uppercase
            tracking-widest
            text-gray-500
            mb-3
          ">
            Main
          </p>

          <div className="space-y-2">
            {renderMenu(mainMenu)}
          </div>

        </div>

        <div>

          <p className="
            text-xs
            uppercase
            tracking-widest
            text-gray-500
            mb-3
          ">
            Learning
          </p>

          <div className="space-y-2">
            {renderMenu(learningMenu)}
          </div>

        </div>

        <div>

          <p className="
            text-xs
            uppercase
            tracking-widest
            text-gray-500
            mb-3
          ">
            Career
          </p>

          <div className="space-y-2">
            {renderMenu(careerMenu)}
          </div>

        </div>

        <div>

          <p className="
            text-xs
            uppercase
            tracking-widest
            text-gray-500
            mb-3
          ">
            Account
          </p>

          <div className="space-y-2">
            {renderMenu(accountMenu)}
          </div>

        </div>

      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
        className="
          mt-6
          bg-red-600
          hover:bg-red-500
          text-white
          rounded-xl
          py-3
          flex
          items-center
          justify-center
          gap-2
          transition-all
        "
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>

  );
}