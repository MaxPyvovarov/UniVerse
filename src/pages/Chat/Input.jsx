import React, {useState} from 'react';
import {Box, TextField, InputAdornment} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Input = () => {
	const [content, setContent] = useState('');
	const [error, setError] = useState('');

	return (
		<Box
			sx={{
				mt: 'auto',
				paddingY: 2,
				paddingX: 1,
				borderTop: '1px solid #ccc',
			}}
		>
			<TextField
				autoComplete='off'
				variant='outlined'
				InputProps={{
					sx: {
						bgcolor: '#f9f9f9',
					},
					endAdornment: (
						<InputAdornment
							position='start'
							sx={{
								cursor: 'pointer',
								paddingLeft: '5px',
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
				fullWidth
				// onKeyDown={addPostHandler}
				onChange={e => setContent(e.target.value)}
				value={content}
				error={!!error}
				placeholder='Написати повідомлення..'
			/>
		</Box>
	);
};

export default Input;
