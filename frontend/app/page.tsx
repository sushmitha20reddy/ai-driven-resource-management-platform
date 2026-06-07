import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO */}

      <section className="px-8 py-24 text-center">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8">

            AI Driven Intelligent
            <br />

            <span className="text-blue-500">
              Resource Management Platform
            </span>

          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">

            Learn smarter, generate AI roadmaps,
            analyze resumes, practice quizzes,
            and track your learning journey with AI.

          </p>

          <div className="flex justify-center gap-5">

            <a
              href="/signup"
              className="
              bg-blue-600
              px-8
              py-4
              rounded-xl
              font-semibold
              hover:bg-blue-500
              "
            >
              Get Started
            </a>

            <a
              href="/login"
              className="
              border border-gray-700
              px-8
              py-4
              rounded-xl
              hover:bg-gray-900
              "
            >
              Login
            </a>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="px-10 py-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          AI Powered Features 🚀
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            title="AI Assistant"
            description="Ask AI questions instantly."
          />

          <FeatureCard
            title="Quiz Generator"
            description="Generate subject quizzes using AI."
          />

          <FeatureCard
            title="Resume Analyzer"
            description="Get ATS score and suggestions."
          />

          <FeatureCard
            title="Study Resources"
            description="Curated learning resources."
          />

          <FeatureCard
            title="AI Roadmap"
            description="Generate personalized learning paths."
          />

          <FeatureCard
            title="Analytics Dashboard"
            description="Track performance and growth."
          />

        </div>

      </section>

      {/* STATS */}

      <section className="px-10 py-20">

        <div className="grid md:grid-cols-4 gap-6">

          <StatCard value="100+" label="Learning Resources" />

          <StatCard value="24/7" label="AI Support" />

          <StatCard value="1000+" label="Quiz Questions" />

          <StatCard value="AI" label="Career Guidance" />

        </div>

      </section>

      {/* WHY */}

      <section className="px-10 py-20 text-center">

        <h2 className="text-4xl font-bold mb-8">
          Why Choose Our Platform?
        </h2>

        <p className="text-gray-400 max-w-4xl mx-auto text-lg">

          Our platform combines Artificial Intelligence,
          learning analytics, quiz generation,
          resume analysis, study resources,
          and career roadmap planning into a
          single modern learning ecosystem.

        </p>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">

        AI Driven Intelligent Resource Management Platform
      </footer>

    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
      bg-gray-900
      border border-gray-800
      p-8
      rounded-2xl
      hover:border-blue-500
      hover:-translate-y-1
      transition-all
      "
    >
      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="
      bg-gradient-to-r
      from-blue-600
      to-purple-700
      p-8
      rounded-2xl
      text-center
      "
    >
      <h3 className="text-5xl font-bold mb-2">
        {value}
      </h3>

      <p>{label}</p>
    </div>
  );
}