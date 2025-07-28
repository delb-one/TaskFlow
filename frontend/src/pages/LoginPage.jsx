import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  Alert
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await loginUser({ email, password });
      console.log(response); // DEBUG
      
      login(response.username, response.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Credenziali non valide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Paper elevation={3} className="p-6">
        <Box className="text-center mb-6">
          <LockOpenIcon fontSize="large" className="text-primary-500" />
          <Typography variant="h4" component="h1" className="mt-2">
            Accedi a TaskFlow
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className="mt-4 py-3 bg-primary-500 hover:bg-primary-600"
            disabled={loading}
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </Button>
        </form>
        
        <Box className="mt-4 text-center">
          <Typography variant="body2">
            Non hai un account?{' '}
            <Link to="/register" className="text-primary-500 hover:underline">
              Registrati
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;