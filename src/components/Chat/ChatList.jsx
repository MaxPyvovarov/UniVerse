import {Avatar, Box, Typography} from '@mui/material';
import React from 'react';
import useChat from '../../hooks/useChat';

const ChatList = ({list, handleSelect}) => {
	const {data} = useChat();
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
							backgroundColor: contact[0] === data.chatId ? '#bbb' : '#eee',
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
