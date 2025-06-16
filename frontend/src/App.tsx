import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './components/HomePage';
import BoardList from './components/BoardList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'; // import 추가
import PostCreateForm from './components/PostCreateForm'; // import 추가

// Routes에 추가

const theme = createTheme();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 페이지 로드 시 저장된 로그인 정보 확인
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (token: string, userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                isLoggedIn={isLoggedIn} 
                user={user} 
                onLogout={handleLogout} 
              />
            } 
          />
          <Route 
            path="/login" 
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />} 
          />
          <Route 
            path="/board" 
            element={
              isLoggedIn ? 
                <BoardList /> : 
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            } 
          />

<Route 
  path="/signup" 
  element={<SignupForm onSignupSuccess={handleLoginSuccess} />} 
/>

<Route 
  path="/board/create" 
  element={
    isLoggedIn ? 
      <PostCreateForm /> : 
      <LoginForm onLoginSuccess={handleLoginSuccess} />
  } 
/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;