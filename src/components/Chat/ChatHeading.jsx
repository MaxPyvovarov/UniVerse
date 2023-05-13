import React from 'react';
import useChat from '../../hooks/useChat';
import {Avatar, Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const ChatHeading = () => {
	const {data} = useChat();

	const navigate = useNavigate();

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
			<Avatar
				src={data.user?.photoURL}
				sx={{height: 56, width: 56, cursor: 'pointer'}}
				onClick={() =>
					navigate(`/profile/${data.user.uid}`, {state: data.user.uid})
				}
			/>
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
