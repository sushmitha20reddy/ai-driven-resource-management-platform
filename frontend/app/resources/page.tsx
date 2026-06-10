"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function ResourcesPage() {
  const [search, setSearch] = useState("");

  const resources = {
    dsa: [
      {
        title: "🟠 LeetCode",
        description: "Coding Interview Preparation",
        link: "https://leetcode.com",
      },
      {
        title: "🧠 NeetCode",
        description: "DSA Roadmaps & Interview Prep",
        link: "https://neetcode.io",
      },
      {
        title: "🟢 GeeksforGeeks",
        description: "Programming Tutorials & DSA",
        link: "https://www.geeksforgeeks.org",
      },
      {
        title: "🏆 HackerRank",
        description: "Coding Practice Platform",
        link: "https://www.hackerrank.com",
      },
      {
        title: "🍛 CodeChef",
        description: "Competitive Programming",
        link: "https://www.codechef.com",
      },
    ],

    ai: [
      {
        title: "🤗 Hugging Face",
        description: "AI Models & Datasets",
        link: "https://huggingface.co",
      },
      {
        title: "📊 Kaggle",
        description: "Datasets & ML Competitions",
        link: "https://www.kaggle.com",
      },
      {
        title: "🎓 DeepLearning.AI",
        description: "AI & ML Courses",
        link: "https://www.deeplearning.ai",
      },
      {
        title: "⚡ FastAI",
        description: "Practical Deep Learning",
        link: "https://www.fast.ai",
      },
      {
        title: "🧠 OpenAI Docs",
        description: "LLM Development Documentation",
        link: "https://platform.openai.com/docs",
      },
    ],

    cloud: [
      {
        title: "☁️ AWS Skill Builder",
        description: "Cloud Learning Platform",
        link: "https://skillbuilder.aws",
      },
      {
        title: "🪟 Microsoft Learn",
        description: "Azure & Development Learning",
        link: "https://learn.microsoft.com",
      },
      {
        title: "🌎 Google Cloud Skills",
        description: "Google Cloud Training",
        link: "https://www.cloudskillsboost.google",
      },
      {
        title: "🐳 Docker Docs",
        description: "Containerization Documentation",
        link: "https://docs.docker.com",
      },
      {
        title: "⚙️ Kubernetes Docs",
        description: "Container Orchestration",
        link: "https://kubernetes.io/docs",
      },
    ],

    certifications: [
      {
        title: "🏅 AWS Cloud Practitioner",
        description: "Beginner AWS Certification",
        link: "https://aws.amazon.com/certification",
      },
      {
        title: "🤖 Azure AI Engineer",
        description: "Microsoft AI Certification",
        link: "https://learn.microsoft.com",
      },
      {
        title: "☁️ Google Cloud Associate",
        description: "Google Cloud Certification",
        link: "https://cloud.google.com/certification",
      },
      {
        title: "🚀 Salesforce Trailhead",
        description: "Salesforce Learning Platform",
        link: "https://trailhead.salesforce.com",
      },
    ],

    placement: [
      {
        title: "🎤 HR Interview Questions",
        description: "Behavioral Interview Preparation",
        link: "https://www.geeksforgeeks.org/hr-interview-questions-and-answers",
      },
      {
        title: "📝 Resume Tips",
        description: "ATS Friendly Resume Building",
        link: "https://www.canva.com/resumes",
      },
      {
        title: "💡 System Design",
        description: "Scalable System Design",
        link: "https://www.geeksforgeeks.org/system-design-tutorial",
      },
    ],
  };

  const ResourceCard = ({
    title,
    description,
    link,
  }: {
    title: string;
    description: string;
    link: string;
  }) => (
    <div
      onClick={() => window.open(link, "_blank")}
      className="
        bg-slate-900/80
        backdrop-blur-md
        p-6
        rounded-2xl
        border
        border-slate-800
        cursor-pointer
        hover:scale-105
        hover:border-blue-500
        transition-all
        duration-300
      "
    >
      <h3 className="text-2xl font-bold text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );

  const filterResources = (items: any[]) =>
    items.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-slate-100 via-white to-purple-100">
      <Sidebar />

      <section className="flex-1 p-10 overflow-y-auto">
        {/* Hero */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl mb-10">
          <h1 className="text-5xl font-bold text-slate-900 mb-3">
            📚 Study Resources
          </h1>

          <p className="text-gray-600 text-lg">
            Coding • AI • Cloud • Certifications • Placements
          </p>

          <div className="mt-6">
            <input
              type="text"
              placeholder="🔍 Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                max-w-lg
                px-5
                py-4
                rounded-xl
                border
                border-gray-300
                bg-white
                outline-none
                focus:border-blue-500
              "
            />
          </div>
        </div>

        {/* DSA */}
        <Section
          title="💻 DSA & Coding"
          items={filterResources(resources.dsa)}
          ResourceCard={ResourceCard}
        />

        {/* AI */}
        <Section
          title="🤖 AI & Machine Learning"
          items={filterResources(resources.ai)}
          ResourceCard={ResourceCard}
        />

        {/* Cloud */}
        <Section
          title="☁️ Cloud & DevOps"
          items={filterResources(resources.cloud)}
          ResourceCard={ResourceCard}
        />

        {/* Certifications */}
        <Section
          title="🎓 Certifications"
          items={filterResources(resources.certifications)}
          ResourceCard={ResourceCard}
        />

        {/* Placement */}
        <Section
          title="💼 Placement Preparation"
          items={filterResources(resources.placement)}
          ResourceCard={ResourceCard}
        />
      </section>
    </main>
  );
}

function Section({
  title,
  items,
  ResourceCard,
}: any) {
  if (items.length === 0) return null;

  return (
    <div className="mb-14">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <ResourceCard
            key={item.title}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
}