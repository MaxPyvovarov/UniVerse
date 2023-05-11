import React from 'react';
import Sidebar from '../components/Chat/Sidebar';
import MainChat from '../components/Chat/MainChat';
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
