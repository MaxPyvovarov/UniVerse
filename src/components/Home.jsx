import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import useAuth from '../hooks/useAuth';

const Home = () => {
	const navigate = useNavigate();
	const {logout} = useAuth();

	useEffect(() => {
		navigate('/');
	}, []);

	return (
		<Button variant='contained' onClick={logout}>
			Вийти
		</Button>
	);
};

export default Home;
