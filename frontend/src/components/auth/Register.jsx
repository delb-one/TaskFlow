// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { registerUser } from '../../services/authService';
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
//   PersonAdd as PersonAddIcon,
//   Visibility, 
//   VisibilityOff,
//   ArrowBack as ArrowBackIcon
// } from '@mui/icons-material';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError('Le password non coincidono');
//       return;
//     }
    
//     if (password.length < 6) {
//       setError('La password deve essere di almeno 6 caratteri');
//       return;
//     }
    
//     setError('');
//     setLoading(true);
    
//     try {
//       const response = await registerUser({ username, email, password });
//       login(response.user, response.token);
//       navigate('/');
//     } catch (err) {
//       setError(err.message || 'Errore durante la registrazione');
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
//             Registrati
//           </Typography>
//         </Box>

//         {error && (
//           <Alert severity="error" className="mb-6">
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Username"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
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

//           <TextField
//             label="Conferma Password"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             size="large"
//             className="mt-6 py-3 bg-primary-500 hover:bg-primary-600"
//             disabled={loading}
//             startIcon={<PersonAddIcon />}
//           >
//             {loading ? 'Registrazione in corso...' : 'Registrati'}
//           </Button>
//         </form>

//         <Box className="mt-6 text-center">
//           <Typography variant="body2">
//             Hai già un account?{' '}
//             <Link 
//               to="/login" 
//               className="text-primary-500 font-medium hover:underline"
//             >
//               Accedi
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Register;