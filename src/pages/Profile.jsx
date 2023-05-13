import React, {useEffect, useState} from 'react';
import {Box, Typography, CircularProgress, CardMedia} from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {MarkAsUnread} from '@mui/icons-material';

import useAuth from '../hooks/useAuth';
import {useLocation} from 'react-router-dom';

import {
	onSnapshot,
	collection,
	query,
	where,
	orderBy,
} from 'firebase/firestore';
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

			setUserProfile(response[0]);
		});

		const qPosts = query(collection(db, 'posts'), orderBy('_id', 'desc'));
		const unsubPosts = onSnapshot(qPosts, doc => {
			let response = [];
			doc.forEach(d => {
				response.push(d.data());
			});

			const filteredPosts = response
				.filter(item => item.author.uid === location.state)
				.reverse();

			setPosts(filteredPosts);
			setIsLoading(false);
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
				<Box
					sx={{
						display: 'flex',
						gap: '50px',
						height: '100%',
						padding: '15px 10px',
					}}
				>
					<Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
						<CardMedia
							component='img'
							height='350'
							src={userProfile.photoURL}
							alt={userProfile.displayName}
						/>
						{userProfile.uid === user.uid && <button>btn</button>}
						<Typography sx={{fontSize: 20, fontWeight: 700, mt: 2}}>
							{userProfile.displayName}
						</Typography>
						<Typography sx={{opacity: 0.7}}>{userProfile.email}</Typography>
					</Box>
					<Box
						sx={{
							flex: 3,
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Typography variant='h4'>Останні пости</Typography>
						{posts.length > 0 ? (
							<Box
								sx={{
									overflowY: 'scroll',
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									gap: '10px',
									paddingRight: '10px',
								}}
							>
								{posts.map(post => (
									<Box
										key={post._id}
										sx={{
											background: '#f9f9f9',
											border: '1px solid rgba(0, 0, 0, 0.23)',
											borderRadius: '15px',
											padding: '15px',
											display: 'flex',
											flexDirection: 'column',
											gap: '5px',
											width: '100%',
										}}
									>
										<Box>
											<Typography sx={{opacity: 0.6, flexShrink: 0}}>
												{post.createdAt}
											</Typography>
										</Box>
										<Typography>{post.content}</Typography>
									</Box>
								))}
							</Box>
						) : (
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									opacity: 0.6,
								}}
							>
								<MarkAsUnread sx={{width: 100, height: 100}} />
								{userProfile.displayName} не робив(-ла) постів
							</Box>
						)}
					</Box>
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
