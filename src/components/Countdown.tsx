import React, { useState, useEffect } from 'react';

interface CountdownProps {
  onComplete: () => void;
}

const Countdown = ({ onComplete }: CountdownProps) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
    } else {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return <h3>Starting in: {count}</h3>;
};

export default Countdown;
