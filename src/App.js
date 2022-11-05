import { Account, Home, Signin, TaskEdit } from 'pages'
import { Route, Routes } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'
import { GlobalProvider } from 'context/GlobalContext'
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
                <GlobalProvider>
                  <Account />
                </GlobalProvider>
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
