
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import UserProvider from "./context/UserContext";
import router from './router'
import "./App.css"

const App = () => {
  return (
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  )
}

export default App
