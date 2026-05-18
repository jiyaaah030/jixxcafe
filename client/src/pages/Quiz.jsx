import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import questions from "../data/questions";

import Navbar from "../components/Navbar";

import { saveResult } from "../services/api";

function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

const userName = location.state?.name || "Coffee Lover";

  const question = questions[currentQuestion];

  const handleNextQuestion = (type) => {
    const updatedAnswers = [...answers, type];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const counts = {};

      updatedAnswers.forEach((answer) => {
        counts[answer] = (counts[answer] || 0) + 1;
      });

      let dominantPersonality = "";
      let highestCount = 0;

      for (let type in counts) {
        if (counts[type] > highestCount) {
          highestCount = counts[type];
          dominantPersonality = type;
        }
      }

      saveResult({
        name: userName,
        personality: dominantPersonality
      })
        .then((data) => {
          console.log(data);
          navigate("/result", {
            state: {
              personality: dominantPersonality,
              name: userName
            }
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    
    <div className="quiz-page">

  <Navbar />

  <div className="quiz-container">

    <div className="quiz-box">

        <p className="question-count">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <div className="progress-bar">

  <div
    className="progress-fill"
    style={{
      width: `${((currentQuestion + 1) / questions.length) * 100}%`
    }}
  ></div>

</div>

        <h2>{question.question}</h2>

        <div className="options">

          {question.options.map((option, index) => (
            <button
              key={index}
              className="option-btn"
              onClick={() => handleNextQuestion(option.type)}
            >
              {option.text}
            </button>
          ))}

        </div>

      </div>

    </div>
    </div>
  );
}

export default Quiz;