import {Avatar, Box, Typography} from '@mui/material';
import React from 'react';

const ChatList = ({list}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				overflowY: 'scroll',
				flexGrow: 1,
			}}
		>
			{list.map(user => (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '7px',
						backgroundColor: '#eee',
						padding: '16px 8px',
						borderBottom: '1px solid #ccc',
						transition: 'background-color .2s ease-in-out',
						cursor: 'pointer',
						'&:hover': {
							backgroundColor: '#ccc',
						},
					}}
				>
					<Avatar src={user.photoURL} sx={{width: 56, height: 56}} />
					<div>
						<Typography variant='h6' fontSize='1.1rem'>
							{user.displayName}
						</Typography>
						<Typography variant='p' fontSize='1rem'>
							Привіт!
						</Typography>
					</div>
				</Box>
			))}
		</Box>
	);
};

export default ChatList;
