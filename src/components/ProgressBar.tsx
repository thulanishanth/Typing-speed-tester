import React from 'react';

type ProgressBarProps = { progress: number };

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div style={{ background: "#ddd", height: 10, width: "100%", marginTop: 10 }}>
    <div style={{ background: "#4caf50", width: `${progress}%`, height: "100%" }} />
  </div>
);

export default ProgressBar;
