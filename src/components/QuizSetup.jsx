import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizSetup.css'; 

function QuizSettings() {
  const [categories, setCategories] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [type, setType] = useState('multiple');
  const navigate = useNavigate();

  // Fetch categories from Open Trivia Database API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

//   const handleStartQuiz = () => {
//     // Navigate to the Quiz component with the selected settings
//     navigate(`/quiz?amount=${numQuestions}&category=${selectedCategory}&difficulty=${difficulty}&type=${type}`);
//   };
  

const handleStartQuiz = async () => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${selectedCategory}&difficulty=${difficulty}&type=${type}`);
      const data = await response.json();
  
      // Save the questions and settings to localStorage
      localStorage.setItem('triviaQuestions', JSON.stringify(data.results));
      localStorage.setItem('triviaQuestionsCount', numQuestions); // Save the number of questions
      
      // Clear previous score
      localStorage.removeItem('score');
  
      navigate(`/quiz`);
    } catch (error) {
      console.error('Failed to fetch questions', error);
    }
  };
  
  

  return (
    <div className='settings-container'>
      <h1>Customize Your Quiz</h1>

      {/* Number of Questions */}
      <div className='setting'>
        <label>Number of Questions:</label>
        <input
          type='number'
          value={numQuestions}
          min={1}
          max={50}
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>

      {/* Category Selection */}
      <div className='setting'>
        <label>Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value=''>Any Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Selection */}
      <div className='setting'>
        <label>Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
      </div>

      {/* Type Selection */}
      <div className='setting'>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value='multiple'>Multiple Choice</option>
          <option value='boolean'>True / False</option>
        </select>
      </div>

      {/* Start Quiz Button */}
      <button className='start-quiz-button' onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default QuizSettings;
