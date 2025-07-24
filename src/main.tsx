import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // ✅ you're choosing this path
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
