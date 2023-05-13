import React, {useEffect, useState} from 'react';
import {Box, Typography, CircularProgress} from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';

import useAuth from '../hooks/useAuth';
import {useLocation} from 'react-router-dom';

import {onSnapshot, collection, query, where} from 'firebase/firestore';
import {db} from '../firebase';

const Profile = () => {
	const location = useLocation();
	const {user} = useAuth();
	const [userProfile, setUserProfile] = useState(null);
	const [posts, setPosts] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const q = query(
			collection(db, 'users'),
			where('uid', '==', location.state)
		);
		const unsub = onSnapshot(q, doc => {
			let response = [];
			doc.forEach(d => {
				response.push(d.data());
			});

			setIsLoading(false);
			setUserProfile(response[0]);
		});

		const qPosts = query(collection(db, 'posts'));
		const unsubPosts = onSnapshot(qPosts, doc => {
			let response = [];
			doc.forEach(d => {
				response.push(d.data());
			});

			const filteredPosts = response
				.filter(item => item.author.uid === location.state)
				.reverse();

			setPosts(filteredPosts);
		});

		return () => {
			unsub();
			unsubPosts();
		};
	}, [location.state]);

	return (
		<>
			{isLoading && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						pt: 6,
					}}
				>
					<CircularProgress />
				</Box>
			)}
			{userProfile && !isLoading && (
				<Box>
					{console.log('profile', userProfile)}
					{console.log('posts', posts)}
					<Typography>{userProfile.displayName}</Typography>
				</Box>
			)}
			{!userProfile && !isLoading && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						pt: 6,
						opacity: 0.6,
					}}
				>
					<PersonOffIcon sx={{width: 100, height: 100}} />
					<Typography variant='h6'>Такого користувача не існує</Typography>
				</Box>
			)}
		</>
	);
};

export default Profile;
