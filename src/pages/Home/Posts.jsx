import React, {useState, useEffect} from 'react';
import {Box, Avatar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import {onSnapshot, collection, orderBy, query} from 'firebase/firestore';
import {db} from '../../firebase';
import {MarkAsUnread} from '@mui/icons-material';

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const q = query(collection(db, 'posts'), orderBy('_id', 'desc'));
		const unsub = onSnapshot(q, doc => {
			let response = [];
			doc.forEach(d => {
				response.push(d.data());
			});

			setPosts(response);
			setIsLoading(false);
		});

		return () => {
			unsub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
			}}
		>
			{isLoading && (
				<CircularProgress
					style={{width: 72, height: 72, alignSelf: 'center'}}
				/>
			)}
			{!isLoading && posts.length === 0 && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						opacity: 0.6,
					}}
				>
					<MarkAsUnread sx={{width: 100, height: 100}} />
					<Typography component='p' variant='h6'>
						Стрічка порожня
					</Typography>
				</Box>
			)}
			{posts.length > 0 &&
				posts.map(post => (
					<Box
						key={post._id}
						sx={{
							background: '#f9f9f9',
							border: '1px solid rgba(0, 0, 0, 0.23)',
							borderRadius: '15px',
							padding: '15px',
						}}
					>
						<Link
							to={`/profile/${post.author.uid}`}
							style={{
								display: 'flex',
								alignItems: 'center',
								color: '#111',
								textDecoration: 'none',
								marginBottom: 12,
							}}
						>
							<Avatar
								src={post.author.photoURL}
								alt={post.author.displayName}
								sx={{width: 50, height: 50, mr: 2}}
							/>
							<Box>
								<Typography sx={{fontSize: 14}}>
									{post.author.displayName}
								</Typography>
								<Typography sx={{fontSize: 14, opacity: '.6'}}>
									{post.createdAt}
								</Typography>
							</Box>
						</Link>

						<Typography sx={{wordWrap: 'break-word'}}>
							{post.content}
						</Typography>
					</Box>
				))}
		</Box>
	);
};

export default Posts;
