import React, {useEffect, useRef} from 'react';
import {Avatar, Box, Typography} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import useChat from '../../hooks/useChat';

const Message = ({msg}) => {
	const {user} = useAuth();
	const {data} = useChat();
	console.log(msg);

	const ref = useRef();

	useEffect(() => {
		ref.current?.scrollIntoView({behavior: 'smooth'});
	}, [msg]);

	return (
		<>
			{msg.senderId !== user.uid ? (
				<Box
					sx={{
						display: 'flex',
						gap: '25px',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
						mb: 2,
					}}
					ref={ref}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							gap: '3px',
						}}
					>
						<Avatar src={data.user.photoURL} sx={{width: 48, height: 48}} />
						<Typography component='p' sx={{fontSize: 14, color: '#999'}}>
							{msg.date}
						</Typography>
					</Box>
					<Box sx={{display: 'flex', maxWidth: '70%'}}>
						<Typography
							component='p'
							sx={{
								backgroundColor: '#ddd',
								padding: '10px',
								borderRadius: '5px',
								mt: 1,
							}}
						>
							{msg.text}
						</Typography>
					</Box>
				</Box>
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row-reverse',
						gap: '25px',
						mb: 2,
						alignItems: 'flex-start',
					}}
					ref={ref}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
							gap: '3px',
						}}
					>
						<Avatar src={user.photoURL} sx={{width: 48, height: 48}} />
						<Typography component='p' sx={{fontSize: 14, color: '#999'}}>
							{msg.date}
						</Typography>
					</Box>
					<Box sx={{display: 'flex', maxWidth: '70%'}}>
						<Typography
							component='p'
							sx={{
								backgroundColor: 'primary.main',
								padding: '10px',
								borderRadius: '5px',
								color: '#fff',
								mt: 1,
							}}
						>
							{msg.text}
						</Typography>
					</Box>
				</Box>
			)}
		</>
	);
};

export default Message;
