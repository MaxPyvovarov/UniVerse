import React from 'react';
import useChat from '../../hooks/useChat';
import {Avatar, Box, Typography} from '@mui/material';

const ChatHeading = () => {
	const {data} = useChat();

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '10px',
				padding: '10px',
				borderBottom: '1px solid #ccc',
			}}
		>
			<Avatar src={data.user.photoURL} sx={{height: 56, width: 56}} />
			<Typography
				sx={{
					fontSize: 18,
					fontWeight: 700,
				}}
			>
				{data.user.displayName}
			</Typography>
		</Box>
	);
};

export default ChatHeading;
