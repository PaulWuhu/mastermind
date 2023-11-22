import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ScoreProvider } from './assets/ScoreContext.tsx'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScoreProvider>
      <App />
    </ScoreProvider>
  </React.StrictMode>,
)
