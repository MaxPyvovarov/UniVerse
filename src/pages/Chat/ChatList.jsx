import {Avatar, Box, Typography} from '@mui/material';
import React from 'react';

const ChatList = ({list, handleSelect}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				overflowY: 'scroll',
				flexGrow: 1,
			}}
		>
			{list
				.sort((a, b) => b[1].date - a[1].date)
				.map(contact => (
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
						key={contact[0]}
						onClick={() => handleSelect(contact[1].userInfo)}
					>
						<Avatar
							src={contact[1]?.userInfo.photoURL}
							sx={{width: 56, height: 56}}
						/>
						<div>
							<Typography variant='h6' fontSize='1.1rem'>
								{contact[1]?.userInfo.displayName}
							</Typography>
							<Typography variant='p' fontSize='1rem'>
								{contact[1]?.lastMessage}
							</Typography>
						</div>
					</Box>
				))}
		</Box>
	);
};

export default ChatList;
