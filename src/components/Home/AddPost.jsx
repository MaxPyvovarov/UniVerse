import React, {useState} from 'react';
import {TextField, Box, InputAdornment} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import useAuth from '../../hooks/useAuth';
import {addDoc, collection} from 'firebase/firestore';
import moment from 'moment/moment';
import {db} from '../../firebase';

const AddPost = () => {
	const [content, setContent] = useState('');
	const {user} = useAuth();
	const [error, setError] = useState('');
	const [isAllowedToSend, setIsAllowedToSend] = useState(true);

	const handleSend = async () => {
		if (user && content.trim() !== '' && isAllowedToSend) {
			const timeStamp = new Date();
			let minutes = 0;

			if (timeStamp.getMinutes() > 9) minutes = timeStamp.getMinutes();
			else minutes = '0' + timeStamp.getMinutes();

			let date =
				moment().format('DD.MM.YY ') +
				`${timeStamp.getHours()}` +
				':' +
				`${minutes}`;

			setIsAllowedToSend(false);

			setTimeout(() => {
				setIsAllowedToSend(true);
			}, 30000);

			setContent('');
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
		}
	};

	const handleKey = e => {
		if (e.key === 'Enter') {
			handleSend();
		}
	};

	return (
		<>
			<Box
				sx={{
					borderRadius: '10px',
					mb: 3,
				}}
			>
				<TextField
					autoComplete='off'
					label='Що у Вас нового?'
					variant='outlined'
					InputProps={{
						sx: {
							bgcolor: '#f9f9f9',
							pr: 1,
						},
						endAdornment: (
							<InputAdornment
								position='start'
								onClick={handleSend}
								sx={{
									cursor: 'pointer',
									pl: '5px',
									transition: 'color .2s ease-in-out',
									'&:hover': {
										color: 'primary.main',
									},
								}}
							>
								<SendIcon />
							</InputAdornment>
						),
					}}
					sx={{width: '100%'}}
					onKeyDown={handleKey}
					onChange={e => setContent(e.target.value)}
					value={content}
					helperText={'Пост можна робити раз на 30 с'}
					error={!!error}
				/>
			</Box>
		</>
	);
};

export default AddPost;
