"use client";

import { useState } from "react";
import axios from "axios";

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

    await axios.post(
  `${API_URL}/save-result`,
  {
    user_email:
      localStorage.getItem("user_email"),
      subject,
      score: totalScore,
      percentage
  }
);

  } catch (error) {

    console.error(
      "Failed to save result",
      error
    );

  }

};

  return (
    <main className="min-h-screen  text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        AI Quiz Generator 🚀
      </h1>

      <div className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Enter subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-gray-900 border border-gray-700 px-5 py-4 rounded-xl flex-1"
        />

        <button
          onClick={generateQuiz}
          className="bg-blue-600 px-8 py-4 rounded-xl"
        >
          {loading ? "Generating..." : "Generate"}
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
    </main>
  );
}