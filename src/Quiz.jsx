import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import './quiz.css';
import axios from 'axios';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [start,setStart]=useState(null);
  const [end,setEnd] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [user, setUser] = useState(null);
const navigate = useNavigate();

useEffect(() => {
  const token = Cookies.get("token");

  if (!token) {
    navigate("/");
  } else {
    try {
      const decoded = jwtDecode(token); 
      const team_name = decoded.name;

      console.log("Team Name:",team_name);

      const userData = Cookies.get("user");
      if (userData) {
        setUser({ ...JSON.parse(userData), team_name });
      } else {
        setUser(team_name);
      }
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/"); 
    }
  }
}, []);

     

  
const startQuiz = () => {
  const token = Cookies.get("token");
  const decoded = jwtDecode(token); 
      const team_name = decoded.name;
  fetch('http://localhost:3000/api/admin/get-questions?set=1')
    .then(res => res.json())
    .then(data => setQuestions(data.questions))
    .catch(err => console.error("Failed to fetch questions", err));

  const startTime = new Date().toISOString();
  setStart(startTime);
  console.log("START TIME IS: ",startTime);
  

  setHasStarted(true);

  const interval = setInterval(() => {
    setElapsedTime(prev => prev + 1);
  }, 1000);
  setTimerInterval(interval);
};

const stopQuizTimer = () => {
  
  clearInterval(timerInterval);
  const endTime = new Date().toISOString();
  console.log("END TIME IS: ",endTime);
  setEnd(endTime);
};


  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleFinish=async()=>{
    const token = Cookies.get("token");
    const decoded = jwtDecode(token); 
    const team_name = decoded.name;
    try{
      const res=await axios.post("http://localhost:3000/api/timer/calculateScore",{
        user_id:team_name,
        start_time:start,
        end_time:end,
        score:score,
      });
      const final_score=res.data.finalScore;
      const time_taken=res.data.timeTaken;
      console.log("FINAL SCORE: ",final_score);
      console.log("TIME: ",time_taken);
      await axios.post("http://localhost:3000/api/timer/saveScore",{
        user_id:team_name,
        final_score:final_score,
        time_taken:time_taken,
      });
    }
    catch(error){
      console.error("Score error:", error.message);
    }




  };
  const handleSubmit = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.correct_answer;

    if (isCorrect) setScore(prev => prev + 10);
   

    setAnswers(prev => [
      ...prev,
      {
        question: currentQuestion.question_text,
        selected: selectedOption,
        correct: currentQuestion.correct_answer,
        isCorrect,
      }
    ]);

    setSelectedOption(null);
    setCurrentIndex(prev => prev + 1);
  };

  useEffect(() => {
  if (hasStarted && currentIndex >= questions.length && questions.length > 0) {
    stopQuizTimer();
  }
}, [currentIndex, questions.length, hasStarted]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (!hasStarted) {
    return (
      <div className='quiz-container1'>
        <h2>Start the Quiz</h2>
        <button onClick={startQuiz} className="submit-btn">Start Quiz</button>
      </div>
    );
  }

  if (questions.length === 0) return <p>Loading questions...</p>;
  if (currentIndex === questions.length) {
 
  return (
    <div className='quiz-container1'>
      <h2>Quiz Completed 🎉</h2>
      <p className="timer">Time Taken: <strong>{formatTime(elapsedTime)}</strong></p>
      <p className="score">Click Finish to end the Quiz. Thank You.</p>
      <button className='submit-btn' onClick={handleFinish}>Finish</button>
    </div>
  );
}
  const current = questions[currentIndex];

  return (
    <div className='quiz-bg'>
    <div className='tot-container'>
    <div className='quiz-container'>
      <div className="quiz-header">
        <h4 className="progress">Question {currentIndex + 1} of {questions.length}</h4>
        <p className="timer">⏱ {formatTime(elapsedTime)}</p>
      </div>

      <p className="question">{current.question_text}</p>

      <div className="options">
        {current.options.map((opt, idx) => (
          <label key={idx} className="option-label">
            <input
              type="radio"
              name="option"
              value={opt}
              checked={selectedOption === opt}
              onChange={() => handleOptionChange(opt)}
            />
            {opt}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className="submit-btn"
      >
        Submit
      </button>
    </div>
    </div>
    </div>
  );
}

export default Quiz;
