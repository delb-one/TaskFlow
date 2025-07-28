import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Typography } from '@mui/material';
import PrivateRoute from './components/layout/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './index.css';

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects/:id" element={<ProjectPage />} />
              </Route>
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-gray-100 py-4 text-center">
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} TaskFlow - Gestione progetti
            </Typography>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;