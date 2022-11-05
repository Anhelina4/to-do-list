import GlobalContext from './GlobalContext'
import { useState } from 'react'

const GlobalProvider = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState(null)
  const [currentTask, setCurrentTask] = useState(null)
  return (
    <GlobalContext.Provider value={{ currentCategory, setCurrentCategory, currentTask, setCurrentTask }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
