import React from 'react'; import {createRoot} from 'react-dom/client'
import {applyTheme} from './config/theme'; import App from './App'; import './index.css'
applyTheme(); createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
