import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components/app/app'
import { BrowserRouter } from 'react-router-dom'

import "@styles/main.scss"
import { ThemeProvider } from '@mui/material'
import { theme } from './styles/theme/muiComponents'
import { Provider } from 'react-redux'
import { store } from '@services/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
