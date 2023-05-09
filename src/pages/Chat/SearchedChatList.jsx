import {Avatar, Box, Typography} from '@mui/material';
import React from 'react';

const SearchedChatList = ({list, handleSelect}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				overflowY: 'scroll',
				flexGrow: 1,
			}}
		>
			{list.map(contact => (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '7px',
						backgroundColor: '#eee',
						padding: '16px 8px',
						borderBottom: '1px solid #ccc',
						transition: 'background-color .2s ease-in-out',
						cursor: 'pointer',
						'&:hover': {
							backgroundColor: '#ccc',
						},
					}}
					key={contact}
					onClick={() => handleSelect(contact)}
				>
					<Avatar src={contact.photoURL} sx={{width: 56, height: 56}} />
					<div>
						<Typography variant='h6' fontSize='1.1rem'>
							{contact.displayName}
						</Typography>
						<Typography variant='p' fontSize='1rem'>
							Привіт!
						</Typography>
					</div>
				</Box>
			))}
		</Box>
	);
};

export default SearchedChatList;
