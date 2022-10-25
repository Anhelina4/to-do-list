import './index.css'
import '@qonsoll/react-design/dist/styles/styles.css'
import '@qonsoll/react-design/dist/styles/vars/index.css'

import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
