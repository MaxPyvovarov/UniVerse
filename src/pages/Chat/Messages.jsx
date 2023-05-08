import React from 'react';
import Message from './Message';
import {Box} from '@mui/material';

const Messages = () => {
	return (
		<Box
			sx={{
				padding: '10px',
				backgroundColor: '#fff',
				overflowY: 'scroll',
				height: '100%',
				flexGrow: 1,
			}}
		>
			<Message isSent={false} />
			<Message isSent={true} />
			<Message isSent={false} />
			<Message isSent={true} />
			<Message isSent={false} />
		</Box>
	);
};

export default Messages;
