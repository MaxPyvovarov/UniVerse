import {Avatar, Box, Typography} from '@mui/material';
import React from 'react';

const Message = ({isSent}) => {
	return (
		<>
			{isSent ? (
				<Box
					sx={{
						display: 'flex',
						gap: '25px',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
						mb: 2,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							gap: '3px',
						}}
					>
						<Avatar
							src='https://img.freepik.com/premium-vector/portrait-of-a-young-man-with-beard-and-hair-style-male-avatar-vector-illustration_266660-423.jpg'
							sx={{width: 48, height: 48}}
						/>
						<Typography component='p' sx={{fontSize: 14, color: '#999'}}>
							08.05.23 14:54
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
							Привіт!
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
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
							gap: '3px',
						}}
					>
						<Avatar
							src='https://img.freepik.com/premium-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg'
							sx={{width: 48, height: 48}}
						/>
						<Typography component='p' sx={{fontSize: 14, color: '#999'}}>
							08.05.23 11:23
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
							Добрий день
						</Typography>
					</Box>
				</Box>
			)}
		</>
	);
};

export default Message;
