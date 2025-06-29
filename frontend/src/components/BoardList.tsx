import {useState, useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom'; // import 추가


  

interface Board
{
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

function BoardList()
{
    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get('http://localhost:3000/board');
                setBoards(response.data);
            } catch (error)
            {
                console.error('API call error:', error);
            }
        };
        fetchBoards();
    }, []);


    return (
        <Container maxWidth="lg" sx={{ mt: 4}}>
            
            <Typography variant="h4" component="h1" gutterBottom>
                게시판
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
    <Typography variant="h4" component="h1">
      게시판
    </Typography>
    <Link to="/board/create">
      <Button variant="contained" color="primary">
        글쓰기
      </Button>
    </Link>
  </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>작성자</TableCell>
                            <TableCell>작성일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boards.map((board) => (
                            <TableRow key={board.id} hover>
                                <TableCell>{board.id}</TableCell>
                                <TableCell>{board.title}</TableCell>
                                <TableCell>{board.author}</TableCell>
                                <TableCell>
                                    {new Date(board.createdAt).toLocaleDateString('ko-KR')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default BoardList;

