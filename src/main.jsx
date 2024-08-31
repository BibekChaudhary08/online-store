import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './redux/store.js'
import { ThemeProvider } from '@material-tailwind/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
