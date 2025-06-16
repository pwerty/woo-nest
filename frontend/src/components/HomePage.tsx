import { 
    Container, 
    Typography, 
    Button, 
    Box, 
    AppBar, 
    Toolbar,
    Grid,
    Card,
    CardContent 
  } from '@mui/material';
  import { Link } from 'react-router-dom';
  
  interface HomePageProps {
    isLoggedIn: boolean;
    user: any;
    onLogout: () => void;
  }
  
  function HomePage({ isLoggedIn, user, onLogout }: HomePageProps) {
    return (
      <Box>
        {/* Navigation */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              우리 게시판
            </Typography>
            <Button color="inherit" component={Link} to="/">
              홈
            </Button>
            <Button color="inherit" component={Link} to="/board">
              게시판
            </Button>
            {isLoggedIn ? (
              <>
                <Typography color="inherit" sx={{ mr: 2 }}>
                  {user?.name}님 환영합니다
                </Typography>
                <Button color="inherit" onClick={onLogout}>
                  로그아웃
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                로그인
              </Button>
            )}
          </Toolbar>
        </AppBar>
  
        {/* Hero Section */}
        <Box sx={{ 
          background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
          color: 'white',
          py: 10,
          textAlign: 'center'
        }}>
          <Container>
            <Typography variant="h2" gutterBottom>
              소통하는 공간
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              자유롭게 글을 작성하고 소통해보세요
            </Typography>
            {isLoggedIn ? (
              <Button 
                variant="contained" 
                size="large" 
                component={Link} 
                to="/board"
                sx={{ mr: 2, bgcolor: 'white', color: 'primary.main' }}
              >
                게시판 보기
              </Button>
            ) : (
              <Button 
                variant="contained" 
                size="large" 
                component={Link} 
                to="/login"
                sx={{ mr: 2, bgcolor: 'white', color: 'primary.main' }}
              >
                로그인하고 시작하기
              </Button>
            )}
          </Container>
        </Box>
  
        {/* Features Section */}
        <Container sx={{ py: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            주요 기능
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>쉬운 글쓰기</Typography>
                  <Typography>직관적인 인터페이스로 누구나 쉽게 글을 작성할 수 있습니다.</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>실시간 소통</Typography>
                  <Typography>빠른 응답과 실시간 업데이트로 활발한 소통이 가능합니다.</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>안전한 관리</Typography>
                  <Typography>체계적인 글 관리와 수정, 삭제 기능을 제공합니다.</Typography>
                </CardContent>
              </Card>
            </Grid>
        </Container>
      </Box>
    );
  }
  
  export default HomePage;
  