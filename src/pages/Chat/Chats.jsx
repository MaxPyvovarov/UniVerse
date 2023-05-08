import {Avatar, Box, Typography} from '@mui/material';
import React from 'react';

const Chats = () => {
	return (
		<Box sx={{display: 'flex', flexDirection: 'column'}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '7px',
					backgroundColor: '#eee',
					padding: '16px 8px',
					borderBottom: '1px solid #ccc',
				}}
			>
				<Avatar
					src='https://img.freepik.com/premium-vector/portrait-of-a-young-man-with-beard-and-hair-style-male-avatar-vector-illustration_266660-423.jpg'
					sx={{width: 56, height: 56}}
				/>
				<div>
					<Typography variant='h6' fontSize='1.1rem'>
						Максим Пивоваров
					</Typography>
					<Typography variant='p' fontSize='1rem'>
						Привіт!
					</Typography>
				</div>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '7px',
					backgroundColor: '#eee',
					padding: '16px 8px',
					borderBottom: '1px solid #ccc',
				}}
			>
				<Avatar
					src='https://img.freepik.com/premium-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg'
					sx={{width: 56, height: 56}}
				/>
				<div>
					<Typography variant='h6' fontSize='1.1rem'>
						Владислав Соцький
					</Typography>
					<Typography variant='p' fontSize='1rem'>
						Ти де там?
					</Typography>
				</div>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '7px',
					backgroundColor: '#eee',
					padding: '16px 8px',
					borderBottom: '1px solid #ccc',
				}}
			>
				<Avatar
					src='https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'
					sx={{width: 56, height: 56}}
				/>
				<div>
					<Typography variant='h6' fontSize='1.1rem'>
						Віолетта Ігнатова
					</Typography>
					<Typography variant='p' fontSize='1rem'>
						Все пока
					</Typography>
				</div>
			</Box>
		</Box>
	);
};

export default Chats;
