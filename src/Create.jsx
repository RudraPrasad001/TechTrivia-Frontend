import { useState } from "react";
import axios from "axios";

import "./create.css";

const Create = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const handleSubmit = async () => {
    if ( !question || correctIndex === null || options.some(opt => opt.trim() === "")) {
      alert("Please fill all fields and select a correct answer.");
      return;
    }

    const payload = {
      question,
      options,
      correctOption: options[correctIndex],
    };

    try {
      console.log(payload);
      await axios.post("http://localhost:3000/api/admin/add-questions", payload);
      alert("Question submitted successfully!");
      setQuestion("");
      setOptions(["", ""]);
      setCorrectIndex(null);
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Something went wrong while submitting the question.");
    }
  };

  return (
    <div className="create-bg">
      <div className="create-container">
        <h2>Create Question</h2>

        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, index) => (
          <div key={index} className="option-line">
            <input
              type="radio"
              name="correct-option"
              checked={correctIndex === index}
              onChange={() => setCorrectIndex(index)}
            />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}

        {options.length < 4 && (
          <button type="button" onClick={addOption}>
            Add Option
          </button>
        )}

        <button type="button" className="submit-btn" onClick={handleSubmit}>
          Submit Question
        </button>
      </div>
    </div>
  );
};

export default Create;
