import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import AddPost from '../components/Home/AddPost';
import Posts from '../components/Home/Posts';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/');
	}, []);

	return (
		<Box
			sx={{
				padding: '15px 10px',
			}}
		>
			<Typography component='h1' variant='h3' marginBottom={4}>
				Новини
			</Typography>
			<AddPost />
			<Posts />
		</Box>
	);
};

export default Home;
