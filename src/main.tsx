import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const defaultTheme = createTheme();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path='/*' element={<App />}   />
          </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
