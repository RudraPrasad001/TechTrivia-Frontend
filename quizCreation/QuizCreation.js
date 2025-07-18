import React, { useState } from 'react';

const QuizCreation = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', ''],
      correctOpIdx: null,
    },
  ]);

  const handleTitleChange = (e) => setQuizTitle(e.target.value);

  const handleQuestionTextChange = (qIdx, value) => {
    const updated = [...questions];
    updated[qIdx].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const handleCorrectChange = (qIdx, oIdx) => {
    const updated = [...questions];
    updated[qIdx].correctOpIdx = oIdx;
    setQuestions(updated);
  };

  const handleAddOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push('');
    setQuestions(updated);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      questionText: '',
      options: ['', ''],
      correctOpIdx: null,
    }]);
  };

  const handleCreateQuiz = () => {
    const formatted = questions.map(q => ({
      questionText: q.questionText,
      options: q.options,
      correctOpIdx: q.correctOpIdx,
      correctOp: q.options[q.correctOpIdx] || ''
    }));

    console.log("Quiz Created:", {
      title: quizTitle,
      questions: formatted
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create Your Quiz</h1>
      <div>
        <strong>Quiz Title:</strong>
        <br />
        <input
          type="text"
          value={quizTitle}
          onChange={handleTitleChange}
          style={{ width: '300px', marginBottom: '20px' }}
        />
      </div>

      {questions.map((q, qIdx) => (
        <div key={qIdx} style={{ marginBottom: '30px' }}>
          <h3>Question {qIdx + 1}</h3>
          <input
            type="text"
            placeholder="What is the question?"
            value={q.questionText}
            onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
            style={{ width: '400px' }}
          />
          <br /><br />
          {q.options.map((opt, oIdx) => (
            <div key={oIdx}>
              <input
                type="text"
                placeholder={`Option ${oIdx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                style={{ width: '200px' }}
              />
              <input
                type="radio"
                name={`correct-${qIdx}`}
                checked={q.correctOpIdx === oIdx}
                onChange={() => handleCorrectChange(qIdx, oIdx)}
                style={{ marginLeft: '10px' }}
              />
              <label>Correct</label>
            </div>
          ))}
          <button onClick={() => handleAddOption(qIdx)} style={{ marginTop: '5px' }}>
            + Add Option
          </button>
        </div>
      ))}

      <button onClick={handleAddQuestion} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', padding: '10px' }}>
        + Add Another Question
      </button>
      <button onClick={handleCreateQuiz} style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>
        Create Quiz
      </button>
    </div>
  );
};

export default QuizCreation;
