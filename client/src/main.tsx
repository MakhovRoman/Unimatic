import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components/app/app'
import { BrowserRouter } from 'react-router-dom'

import "@styles/main.scss"
import { ThemeProvider } from '@mui/material'
import { theme } from './styles/theme/muiComponents'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
