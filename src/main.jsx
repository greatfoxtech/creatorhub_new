import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { loadActiveTheme, applyThemeToCSSVars } from '@/lib/themes'

// Apply the stored theme before first render so there's no flash
applyThemeToCSSVars(loadActiveTheme())

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)