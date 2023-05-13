import React, {useState, useEffect} from 'react';
import {
	Box,
	Typography,
	CircularProgress,
	Card,
	CardContent,
	CardMedia,
} from '@mui/material';

import {onSnapshot, collection, query} from 'firebase/firestore';
import {db} from '../firebase';
import {useNavigate} from 'react-router-dom';

const People = () => {
	const [people, setPeople] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const q = query(collection(db, 'users'));
		const unsub = onSnapshot(q, doc => {
			let response = [];
			doc.forEach(d => {
				response.push(d.data());
			});

			setPeople(response);
			setIsLoading(false);
		});

		return () => unsub();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '15px 10px',
				height: '100%',
			}}
		>
			<Box
				sx={{
					padding: '16px 16px 0',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 4,
				}}
			>
				<Typography component='h1' variant='h3'>
					Люди
				</Typography>
			</Box>
			{isLoading && (
				<CircularProgress
					style={{width: 72, height: 72, alignSelf: 'center'}}
				/>
			)}
			{people.length > 0 && (
				<Box
					sx={{
						overflowY: 'scroll',
						height: '100%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							gap: '20px',
							flexWrap: 'wrap',
						}}
					>
						{people.map(person => (
							<Card
								sx={{
									display: 'flex',
									height: '210px',
									width: '360px',
									background: '#f9f9f9',
									cursor: 'pointer',
									transition: 'box-shadow .2s ease-in-out',
									'&:hover': {
										boxShadow:
											'0px 5px 10px -1px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);',
									},
								}}
								onClick={() =>
									navigate(`/profile/${person.uid}`, {state: person.uid})
								}
								key={person.uid}
							>
								{person.photoURL && (
									<CardMedia
										component='img'
										sx={{width: 140}}
										image={person.photoURL}
										alt={person.displayName}
									/>
								)}
								<Box sx={{display: 'flex', flexDirection: 'column'}}>
									<CardContent sx={{flex: '1 0 auto'}}>
										<Typography
											component='div'
											variant='h5'
											sx={{
												width: '200px',
												overflow: 'hidden',
												display: 'inline-block',
												textOverflow: 'ellipsis',
												whiteSpace: 'pre-wrap',
											}}
										>
											{person.displayName}
										</Typography>
										<Typography
											variant='subtitle1'
											color='text.secondary'
											component='div'
										>
											{person.email}
										</Typography>
									</CardContent>
								</Box>
							</Card>
						))}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default People;
