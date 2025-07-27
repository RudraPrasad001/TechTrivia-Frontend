import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import './quiz.css';
import axios from 'axios';
import { meta } from '@eslint/js';

function Quiz() {

    const url = import.meta.env.VITE_API_URL;
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [user, setUser] = useState(null);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) navigate("/");
    else {
      try {
        const decoded = jwtDecode(token);
        const team_name = decoded.name;
        const userData = Cookies.get("user");
        setUser(userData ? { ...JSON.parse(userData), team_name } : team_name);
      } catch (err) {
        console.error("Invalid token", err);
        navigate("/");
      }
    }
  }, []);

const startQuiz = async () => {
  try {
    const token = Cookies.get("token");
    const decoded = jwtDecode(token);
    const team_name = decoded.name;
    const setRes = await axios.get(`${url}/api/admin/random-set`);
    console.log(setRes);
    const  set  = await setRes.data.set;

    console.log(`set number assigned : ${set}`);
    const questionRes = await axios.get(`${url}/api/admin/get-questions?set=${set}`);
    const questionData = questionRes.data;
    console.log(questionData);
    setQuestions(questionData.questions);
    
    const startTime = new Date().toISOString();
    setStart(startTime);
    setHasStarted(true);

    const interval = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
    setTimerInterval(interval);
  } catch (err) {
    console.error("Failed to start quiz:", err);
  }
};


  





  const handleOptionChange = (option) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = option === currentQuestion.correct_answer;
    const alreadySelected = answers[currentIndex]?.selected;

    if (!alreadySelected) {
      if (isCorrect) setScore(prev => prev + 10);
    } else {
      if (isCorrect && alreadySelected !== currentQuestion.correct_answer) setScore(prev => prev + 10);
      else if (!isCorrect && alreadySelected === currentQuestion.correct_answer) setScore(prev => prev - 10);
    }

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      question: currentQuestion.question_text,
      selected: option,
      correct: currentQuestion.correct_answer,
      isCorrect,
    };
    setAnswers(updatedAnswers);
    setSelectedOption(option);

    
  };
const handleFinish = async () => {
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  const team_name = decoded.name;
  clearInterval(timerInterval);
  const endTime = new Date().toISOString();
  setEnd(endTime); 

  try {
    if (team_name) {
      const res = await axios.post(`${url}/api/timer/calculateScore`, {
        user_id: team_name,
        start_time: start,
        end_time: endTime, 
        score: score,
      });
      const { finalScore, timeTaken } = res.data;

      await axios.post(`${url}/api/timer/saveScore`, {
        user_id: team_name,
        final_score: finalScore,
        time_taken: timeTaken,
      });

      alert("Quiz submitted successfully!");
      navigate("/");
    }
  } catch (error) {
    console.error("Score error:", error.response?.data || error.message);
  }
};


  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (answers.length === questions.length) {
      setShowFinalScreen(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const saved = answers[currentIndex]?.selected || null;
    setSelectedOption(saved);
  }, [currentIndex]);

  if (!hasStarted) {
  return (
    <div className='quiz-container1'>
      <h2 className='complete'>Quiz Rules</h2>
      <ul className="rules-list">
        <li>The quiz contains 10 questions in total. The first 9 questions are multiple-choice questions (MCQs).</li>
        
        <li>The 10th question will be a coding question where you must predict the output of a given code snippet.</li>
        <li>You are allowed to revisit any question during the quiz. You can go to the next or previous question.</li>
        <li>You can change your answers anytime before submitting.</li>
        <li>The quiz timer starts as soon as you begin the quiz. Make sure to answer all questions before clicking the finish button.</li>
        <li>Your final score will be based on both the number of correct answers and the time taken to complete the quiz.</li>
        
      </ul>
      <h2 className='progress'> ALL THE BEST</h2>
      <button onClick={startQuiz} className="submit-btn">Start Quiz</button>
    </div>
  );
}


  if (questions.length === 0) return <p>Loading questions...</p>;

  if (showFinalScreen) {
    return (
      <div style={{display:"flex",justifyContent:'center',alignItems:'center',height:"100vh"}}>
      <div className='quiz-container1'>
        <h2 className='complete'>Quiz Completed 🎉</h2>
        <p className="timer">Time Taken: <strong>{formatTime(elapsedTime)}</strong></p>
        {!showConfirmFinish ? (
          <>
            <p className="score">Click Finish to end the Quiz. You can also go back to review your answers.</p>
            <button className='submit-btn' onClick={() => setShowConfirmFinish(true)}>Finish</button>
            <button className='submit-btn cancel' onClick={() => {
              setShowFinalScreen(false);
              setCurrentIndex(questions.length - 1);
            }}>Go Back</button>
          </>
        ) : (
          <>
            <p className='score'>Are you sure you want to submit?</p>
            <button className='submit-btn' onClick={handleFinish}>Yes, Submit</button>
            <button className='submit-btn cancel' onClick={() => setShowConfirmFinish(false)}>Cancel</button>
          </>
        )}
      </div>
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

          <div className="nav-btns">
            <button onClick={handlePrev} disabled={currentIndex === 0} className="submit-btn nav">Prev</button>
            <button onClick={handleNext} disabled={selectedOption == null} className="submit-btn nav">
              {currentIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
