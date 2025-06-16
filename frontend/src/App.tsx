import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './components/HomePage';
import BoardList from './components/BoardList';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
