import { Account, Home, Signin, TaskEdit } from 'pages'
import { Route, Routes } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Protected from './components/Protected'
import React from 'react'

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
