import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ScoreProvider } from './assets/ScoreContext.tsx'
import "./index.css";
import { AuthProvider } from './assets/UserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <ScoreProvider>
      <App />
    </ScoreProvider>
    </AuthProvider>
  </React.StrictMode>,
)
