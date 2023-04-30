import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/system';
import {Alert} from '@mui/material';

import useAuth from '../../hooks/useAuth';
import {addDoc, collection} from 'firebase/firestore';
import moment from 'moment/moment';
import {db} from '../../firebase';

const AddPost = () => {
	const [content, setContent] = useState('');
	const {user} = useAuth();
	const [error, setError] = useState('');

	const addPostHandler = async e => {
		const timeStamp = new Date();
		let minutes = 0;

		if (timeStamp.getMinutes() > 9) minutes = timeStamp.getMinutes();
		else minutes = '0' + timeStamp.getMinutes();

		let date =
			moment().format('DD.MM.YY ') +
			`${timeStamp.getHours()}` +
			':' +
			`${minutes}`;

		if (e.key === 'Enter' && user && e.target.value.trim() !== '') {
			try {
				await addDoc(collection(db, 'posts'), {
					author: {
						displayName: user.displayName,
						photoURL: user.photoURL,
						uid: user.uid,
					},
					content,
					createdAt: date,
					_id: timeStamp.getTime(),
				});
			} catch (e) {
				setError(e);
			}

			setContent('');
		}
	};

	return (
		<>
			{error && (
				<Alert severity='error' sx={{marginBottom: 10}}>
					{error}
				</Alert>
			)}
			<Box
				sx={{
					borderRadius: '10px',
					mb: 5,
				}}
			>
				<TextField
					autoComplete='off'
					label='Що у Вас нового?'
					variant='outlined'
					InputProps={{
						sx: {
							borderRadius: '20px',
							bgcolor: '#f9f9f9',
							overflow: 'revert',
						},
					}}
					sx={{width: '100%'}}
					onKeyDown={addPostHandler}
					onChange={e => setContent(e.target.value)}
					value={content}
				/>
			</Box>
		</>
	);
};

export default AddPost;
