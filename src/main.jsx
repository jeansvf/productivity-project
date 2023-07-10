import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimerContext from './contexts/TimerContext'
import MusicContext from './contexts/MusicContext.jsx'
import ProfileContext from './contexts/ProfileContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <ProfileContext>
    <TimerContext>
      <MusicContext>
        <App />
      </MusicContext>
    </TimerContext>
  </ProfileContext>

)
