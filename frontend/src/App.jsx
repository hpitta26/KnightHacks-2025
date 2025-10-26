import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Login from './pages/LoginSignup'
import Navbar from './components/Navbar'
import { ConsultationProvider } from './contexts/ConsultationContext'

// Protected Route component
function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme !== null ? savedTheme === "dark" : true; // Default to dark mode
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("isLoggedIn");
    if (savedAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ConsultationProvider>
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard isDark={isDark} setIsDark={setIsDark} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/login' 
            element={
              !isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </Router>
    </ConsultationProvider>
  )
}

export default App
