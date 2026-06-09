"use client";

import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function QuizPage() {
  const [subject, setSubject] = useState("");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
const API_URL =
  "https://ai-platform-backend-5msg.onrender.com";

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const generateQuiz = async () => {
    try {
      setLoading(true);

      const API_URL =
  "https://ai-platform-backend-5msg.onrender.com";

const response = await axios.post(
  `${API_URL}/generate-quiz`,
  {
    subject,
  }
);
      setQuiz(response.data.quiz);
      setScore(null);
      setSelectedAnswers({});
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

 const submitQuiz = async () => {

  let totalScore = 0;

  quiz.forEach((question, index) => {
    if (
      selectedAnswers[index] === question.answer
    ) {
      totalScore++;
    }
  });

  const percentage =
    (totalScore / quiz.length) * 100;

  setScore(totalScore);
  setSubmitted(true);

  try {

    const email =
      localStorage.getItem("user_email");

    console.log("Saving result for:", email);

    if (!email) {
      alert("User email not found");
      return;
    }

    const response = await axios.post(
      `${API_URL}/save-result`,
      {
        user_email: email,
        subject,
        score: totalScore,
        percentage
      }
    );

    console.log(
      "Result Saved:",
      response.data
    );

  } catch (error) {

    console.error(
      "Failed to save result",
      error
    );

  }

};

  return (
  <main className="min-h-screen flex text-white">

    <Sidebar />

    <section className="flex-1 p-10">
     <div className="mb-10">

  <h1
    className="
      text-6xl
      font-extrabold
      bg-gradient-to-r
      from-blue-400
      via-cyan-400
      to-purple-500
      bg-clip-text
      text-transparent
    "
  >
    AI Quiz Generator 🚀
  </h1>

  <p className="text-slate-400 mt-3 text-lg">
    Generate AI-powered quizzes and test your knowledge instantly.
  </p>

</div>
    <div className="flex gap-4 mb-10">

  <input
    placeholder="Example: Python, AI, DSA, Web Technology..."
    value={subject}
    onChange={(e) =>
      setSubject(e.target.value)
    }
    className="
      flex-1
      bg-slate-900/60
      backdrop-blur-xl
      border border-slate-700/40
      rounded-2xl
      px-6
      py-5
      text-white
      text-lg
      outline-none
    "
  />

  <button
    onClick={generateQuiz}
    className="
      px-10
      py-5
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      to-purple-600
      font-semibold
      hover:scale-105
      transition-all
    "
  >
    ✨ Generate
  </button>

</div>

      <div className="space-y-8">
        {quiz.map((q, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
          >
            <h2 className="text-xl font-bold mb-4">
              {index + 1}. {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map(
                (option: string, optionIndex: number) => (
                  <label
  key={optionIndex}
  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer
  ${
    submitted && option === q.answer
      ? "bg-green-900 border-green-500"
      : submitted &&
        selectedAnswers[index] === option &&
        option !== q.answer
      ? "bg-red-900 border-red-500"
      : "bg-black border-gray-700"
  }`}
>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={
                        selectedAnswers[index] === option
                      }
                      onChange={() =>
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [index]: option,
                        })
                      }
                    />

                    {option}
                    {submitted && option === q.answer && (
  <span className="text-green-400 ml-2">
    ✔ Correct Answer
  </span>
)}

{submitted &&
  selectedAnswers[index] === option &&
  option !== q.answer && (
    <span className="text-red-400 ml-2">
      ✖ Wrong Answer
    </span>
)}
                  </label>
                )
              )}
            </div>
          </div>
        ))}
      </div>

{quiz.length > 0 && (

<div className="grid md:grid-cols-3 gap-6 mb-10">

  <div className="bg-slate-900/60 p-6 rounded-3xl">
    <h3 className="text-slate-400">
      Subject
    </h3>

    <p className="text-3xl font-bold">
      {subject}
    </p>
  </div>

  <div className="bg-slate-900/60 p-6 rounded-3xl">
    <h3 className="text-slate-400">
      Questions
    </h3>

    <p className="text-3xl font-bold">
      {quiz.length}
    </p>
  </div>

  <div className="bg-slate-900/60 p-6 rounded-3xl">
    <h3 className="text-slate-400">
      Difficulty
    </h3>

    <p className="text-3xl font-bold">
      Medium
    </p>
  </div>

</div>

)}

      {quiz.length > 0 && (
        <button
          onClick={submitQuiz}
          className="bg-green-600 px-8 py-4 rounded-xl mt-8"
        >
          Submit Quiz
        </button>
      )}

      {score !== null && (
        <div className="mt-10 bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-3xl font-bold mb-3">
            Quiz Result 🎉
          </h2>

          <p className="text-xl">
            Score: {score} / {quiz.length}
          </p>

          <p className="text-lg text-gray-400 mt-2">
            Percentage:{" "}
            {((score / quiz.length) * 100).toFixed(2)}%
          </p>
        </div>
      )}
    
      </section>

  </main>
);
  
}