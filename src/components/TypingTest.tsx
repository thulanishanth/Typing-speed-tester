import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown from './Countdown';
import ProgressBar from './ProgressBar';

const TypingTest: React.FunctionComponent = () => {
  const [text, setText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchText = async () => {
    const res = await axios.get('/api/get_text/');
    setText(res.data.text);
    setResult(null);
    setTypedText("");
    setProgress(0);
  };

  useEffect(() => {
    fetchText();
  }, []);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedText(e.target.value);
    setProgress((e.target.value.length / text.length) * 100);
  };

  const handleSubmit = async () => {
    const res = await axios.post('/api/submit/', { typedText });
    setResult(res.data);
    setIsStarted(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Typing Speed Tester</h2>
      {!isStarted && !result && <Countdown onComplete={() => setIsStarted(true)} />}
      {isStarted && (
        <>
          <p>Type this text:</p>
          <p style={{ background: "#eee", padding: 10 }}>{text}</p>
          <input
            type="text"
            value={typedText}
            onChange={handleTyping}
            style={{ width: "100%", fontSize: 18 }}
          />
          <ProgressBar progress={progress} />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
      {result && (
        <div style={{ marginTop: 20 }}>
          <p>Time Taken: {result.timeTaken} sec</p>
          <p>WPM: {result.wpm}</p>
          <p>Accuracy: {result.accuracy}%</p>
          <p>Average WPM: {result.averageWpm}</p>
          <button onClick={fetchText}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
