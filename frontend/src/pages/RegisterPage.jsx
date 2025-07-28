import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/authService';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  Alert
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Le password non coincidono');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const response = await registerUser({ username, email, password });
      login(response.user, response.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Errore durante la registrazione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Paper elevation={3} className="p-6">
        <Box className="text-center mb-6">
          <PersonAddIcon fontSize="large" className="text-primary-500" />
          <Typography variant="h4" component="h1" className="mt-2">
            Crea un nuovo account
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
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
          
          <TextField
            label="Conferma Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Registrazione in corso...' : 'Registrati'}
          </Button>
        </form>
        
        <Box className="mt-4 text-center">
          <Typography variant="body2">
            Hai già un account?{' '}
            <Link to="/login" className="text-primary-500 hover:underline">
              Accedi
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;