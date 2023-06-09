import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimerContext from './contexts/TimerContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <TimerContext>
      <App />
    </TimerContext>
)
