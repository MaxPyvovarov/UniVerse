import {Box} from '@mui/material';
import React from 'react';
import ChatHeading from './ChatHeading';
import Messages from './Messages';
import Input from './Input';
import useChat from '../../hooks/useChat';

const MainChat = () => {
	const {data} = useChat();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flex: 2,
				flexShrink: 0,
			}}
		>
			{data.chatId !== 'null' && (
				<>
					<ChatHeading />
					<Messages />
					<Input />
				</>
			)}
		</Box>
	);
};

export default MainChat;
