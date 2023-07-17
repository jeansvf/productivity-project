import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimerContext from './contexts/TimerContext'
import MusicContext from './contexts/MusicContext.jsx'
import ProfileContext from './contexts/ProfileContext.jsx'
import GoalsContext from './contexts/GoalsContext.jsx'
import TodoContext from './contexts/TodoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProfileContext>
    <TimerContext>
      <MusicContext>
        <TodoContext>
          <GoalsContext>
            <App />
          </GoalsContext>
        </TodoContext>
      </MusicContext>
    </TimerContext>
  </ProfileContext>
)
