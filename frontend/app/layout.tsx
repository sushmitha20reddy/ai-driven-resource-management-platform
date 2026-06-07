import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Career Platform",
  description: "AI Learning & Career Guidance Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          text-white
          bg-gradient-to-br
          from-slate-950
          via-blue-950
          to-black
          relative
          overflow-x-hidden
        "
      >
        {/* AI Background Glow */}

        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div
            className="
              absolute
              top-20
              left-20
              w-96
              h-96
              bg-blue-600
              rounded-full
              blur-[150px]
              opacity-20
            "
          />

          <div
            className="
              absolute
              bottom-20
              right-20
              w-96
              h-96
              bg-purple-600
              rounded-full
              blur-[150px]
              opacity-20
            "
          />

          <div
            className="
              absolute
              top-1/2
              left-1/2
              w-96
              h-96
              bg-cyan-500
              rounded-full
              blur-[180px]
              opacity-10
              -translate-x-1/2
              -translate-y-1/2
            "
          />
        </div>

        {children}
      </body>
    </html>
  );
}