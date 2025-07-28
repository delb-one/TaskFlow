// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { loginUser } from '../../services/authService';
// import { useAuth } from '../../context/AuthContext';
// import { 
//   TextField, 
//   Button, 
//   Typography, 
//   Box, 
//   Paper,
//   Alert,
//   IconButton,
//   InputAdornment
// } from '@mui/material';
// import { 
//   Lock as LockIcon, 
//   Visibility, 
//   VisibilityOff,
//   ArrowBack as ArrowBackIcon
// } from '@mui/icons-material';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       setError('Inserisci email e password');
//       return;
//     }
    
//     setError('');
//     setLoading(true);
    
//     try {
//       const response = await loginUser({ email, password });
//       login(response.user, response.token);
//       navigate('/');
//     } catch (err) {
//       setError(err.message || 'Credenziali non valide');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Paper elevation={3} className="w-full max-w-md p-8">
//         <Box className="mb-6 flex items-center">
//           <IconButton onClick={() => navigate(-1)} className="mr-2">
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h4" component="h1" className="font-bold">
//             Accedi
//           </Typography>
//         </Box>

//         {error && (
//           <Alert severity="error" className="mb-6">
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Box className="mt-2 text-right">
//             <Link 
//               to="/forgot-password" 
//               className="text-sm text-primary-500 hover:underline"
//             >
//               Password dimenticata?
//             </Link>
//           </Box>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             size="large"
//             className="mt-6 py-3 bg-primary-500 hover:bg-primary-600"
//             disabled={loading}
//           >
//             {loading ? 'Accesso in corso...' : 'Accedi'}
//           </Button>
//         </form>

//         <Box className="mt-6 text-center">
//           <Typography variant="body2">
//             Non hai un account?{' '}
//             <Link 
//               to="/register" 
//               className="text-primary-500 font-medium hover:underline"
//             >
//               Registrati
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;