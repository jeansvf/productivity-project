import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimerContext from './contexts/TimerContext'
import MusicContext from './contexts/MusicContext.jsx'
import ProfileContext from './contexts/ProfileContext.jsx'
import GoalsContext from './contexts/GoalsContext.jsx'
import TodoContext from './contexts/TodoContext.jsx'
import HintsContext from './contexts/HintsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HintsContext>
    <ProfileContext>
      <TimerContext>
        <MusicContext>
          <TodoContext>
            <GoalsContext>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </GoalsContext>
          </TodoContext>
        </MusicContext>
      </TimerContext>
    </ProfileContext>
  </HintsContext>
)
