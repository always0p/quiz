import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Result.css';

function Result() {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0); // State to hold the total number of questions

  const navigate = useNavigate();
  
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("selectedAnswers")) || [];
    const fetchedQuestions = JSON.parse(localStorage.getItem("triviaQuestions")) || [];
    const savedScore = parseInt(localStorage.getItem("score")) || 0;
    const savedTotalQuestions = parseInt(localStorage.getItem("triviaQuestionsCount")) || fetchedQuestions.length;
  
    setSelectedAnswers(savedAnswers);
    setQuestions(fetchedQuestions);
    setScore(savedScore);
    setTotalQuestions(savedTotalQuestions); // Ensure this is correctly set
  }, []);
  
  if (questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className='container'>
      <h1>Quiz Result</h1>
      <hr />
      <h2>Your Score: {score} out of {totalQuestions}</h2> {/* Use totalQuestions here */}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <h3>
              Question {index + 1}: <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
            </h3>
            <p>
              Your answer:{" "}
              <strong
                className={
                  selectedAnswers[index] === question.correct_answer ? "correct" : "incorrect"
                }
              >
                {selectedAnswers[index] || "No answer given"} {/* Show "No answer given" if skipped */}
              </strong>
            </p>
            <p>Correct answer: <strong>{question.correct_answer}</strong></p>
          </li>
        ))}
      </ul>
      <div className='navigation-buttons'>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/quizsetup")}>Retake Quiz</button>
      </div>
    </div>
  );
}

export default Result;
