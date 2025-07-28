import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext } from 'react';
import { ColorModeContext } from '../../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
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
        <Box className="flex items-center gap-4">
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {currentUser ? (
            <>
              <Typography className="text-white">Ciao, {currentUser}</Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                className="bg-white text-primary-500 hover:bg-gray-100"
              >
                Logout
              </Button>
            </>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;