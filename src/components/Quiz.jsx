import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Quiz.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchedQuestions = JSON.parse(localStorage.getItem("triviaQuestions")) || [];
    const savedScore = parseInt(localStorage.getItem("score")) || 0;

    if (fetchedQuestions.length > 0) {
      setQuestions(fetchedQuestions);
      setScore(savedScore);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      shuffleAnswers();
      setIsAnswered(false);
      setCorrectAnswer(questions[currentQuestionIndex].correct_answer);
    }
  }, [currentQuestionIndex, questions]);

  const shuffleAnswers = () => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available</div>;
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);  // Reset answer state for the next question
    }
  };

  const checkAnswer = (selectedAnswer) => {
    if (isAnswered) return;

    const isCorrect = selectedAnswer === correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = selectedAnswer;
      return updatedAnswers;
    });

    setIsAnswered(true);
  };

  const handleSubmit = () => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    localStorage.setItem("score", score);
    localStorage.setItem("triviaQuestionsCount", questions.length);
    navigate("/result");
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='quiz-container'>
      <h1>QUIZ-APP</h1>
      <hr />
      <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h2>
      <ul>
        {shuffledAnswers.map((answer, index) => (
          <li
            key={index}
            onClick={() => checkAnswer(answer)}
            className={`answer-option ${isAnswered ? (answer === correctAnswer ? "correct" : "incorrect") : ""}`}
          >
            {answer}
          </li>
        ))}
      </ul> 

      <div className='buttons-container'>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>

      <div className='question-index'>
        {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  );
}

export default Quiz;
