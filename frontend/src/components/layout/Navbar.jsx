import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" className="bg-primary-500 shadow-none">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component={Link} to="/" className="text-white no-underline">
          TaskFlow
        </Typography>
        
        {currentUser ? (
          <Box className="flex items-center gap-4">
            <Typography className="text-white">Ciao, {currentUser.username}</Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              className="bg-white text-primary-500 hover:bg-gray-100"
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button 
              component={Link} 
              to="/login" 
              color="inherit"
              className="text-white"
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register" 
              color="inherit"
              className="text-white"
            >
              Registrati
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;