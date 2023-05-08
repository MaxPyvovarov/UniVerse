import React from 'react';
import Sidebar from './Sidebar';
import MainChat from './MainChat';
import {Box} from '@mui/material';

const ChatPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				height: '100%',
			}}
		>
			<Sidebar />
			<MainChat />
		</Box>
	);
};

export default ChatPage;
