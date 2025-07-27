import { useState, useEffect } from "react";
import axios from "axios";
import "./create.css";

const Create = () => {

    const URL = import.meta.env.VITE_API_URL;
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [selectedSet, setSelectedSet] = useState(1);
  const [setCounts, setSetCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });

  useEffect(() => {
    const fetchSetCounts = async () => {
      try {
        const res = await axios.get(`${URL}/api/admin/set-counts`);
        setSetCounts(res.data);
      } catch (err) {
        console.error("Failed to fetch set counts", err);
      }
    };
    fetchSetCounts();
  }, []);

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
    if (!question || correctIndex === null || options.some(opt => opt.trim() === "")) {
      alert("Please fill all fields and select a correct answer.");
      return;
    }

    if (setCounts[selectedSet] >= 10) {
      alert(`Set ${selectedSet} already has 10 questions (limit reached).`);
      return;
    }

    const payload = {
      set: selectedSet,
      question,
      options,
      correct: options[correctIndex],
    };

    try {
      await axios.post(`http://${URL}/api/admin/add-questions`, payload);
      alert("Question submitted successfully!");

      const updated = await axios.get(`http://${URL}/api/admin/set-counts`);
      setSetCounts(updated.data);

      // Reset form
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
        <h2 className="create">Create Question</h2>

        <select value={selectedSet} onChange={(e) => setSelectedSet(Number(e.target.value))}>
          {[1, 2, 3, 4].map(set => (
            <option key={set} value={set}>
              Set {set} ({setCounts[set] || 0}/10)
            </option>
          ))}
        </select>

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
          <button type="button" onClick={addOption} className="add-btn">
            Add Option
          </button>
        )}

        <button type="button" className="submitt-btn" onClick={handleSubmit}>
          Submit Question
        </button>
      </div>
    </div>
  );
};

export default Create;
