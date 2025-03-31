import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProvider  from "./context/UserContext";
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </UserProvider>
  </StrictMode>,
)
