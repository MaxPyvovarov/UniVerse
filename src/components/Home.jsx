import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Avatar, Button, Typography} from '@mui/material';
import useAuth from '../hooks/useAuth';

const Home = () => {
	const navigate = useNavigate();
	const {user, logout} = useAuth();

	useEffect(() => {
		navigate('/');
	}, []);

	return (
		<>
			<Button variant='contained' onClick={logout}>
				Вийти
			</Button>
			<Avatar src={user.photoURL} sx={{width: 64, height: 64}} />
			<Typography component='h3' variant='h5'>
				{user.displayName}
			</Typography>
		</>
	);
};

export default Home;
