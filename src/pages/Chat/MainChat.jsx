import {Box} from '@mui/material';
import React from 'react';
import Messages from './Messages';
import Input from './Input';

const MainChat = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flex: 2,
				flexShrink: 0,
			}}
		>
			<Messages />
			<Input />
		</Box>
	);
};

export default MainChat;
