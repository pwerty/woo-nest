import { useState } from "react";
import { Container, Paper, TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";

interface LoginFormProps {
    onLoginSuccess: (token:string, user:any) => void;
}

function LoginForm({ onLoginSuccess}: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    

    try {
        const response = await axios.post('https://localhost:3000/auth/login', { email, password,});

        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    
        onLoginSuccess(response.data.access_token, response.data.user);
        
    }
    catch (error: any) {
        setError(error.response?.data?.message || "로그인 실패");
    }
    finally {
        setIsLoading(false);
    }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{p :4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    로그인
                </Typography>
            </Paper>

            {error && <Alert severity="error" sx={{mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleLogin}>
                <TextField fullWidth label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                margin="normal" required/>
                <TextField fullWidth label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                margin="normal" required/>
                <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading} sx={{ mt: 3, mb: 2}}>
                    {isLoading ? '로그인 중.. ' : '로그인'}
                </Button>
            </Box>
        </Container>
    );

}

export default LoginForm;