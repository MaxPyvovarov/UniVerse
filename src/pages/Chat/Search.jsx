import React, {useState} from 'react';
import {Box, InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({handleSearch}) => {
	const [username, setUsername] = useState('');

	const handleKey = e => {
		if (e.key === 'Enter') {
			handleSearch(username);
		}
	};

	return (
		<Box
			sx={{
				padding: '15px 0 0 1px',
			}}
		>
			<TextField
				InputProps={{
					startAdornment: (
						<InputAdornment
							position='start'
							sx={{
								cursor: 'pointer',
								transition: 'color .2s ease-in-out',
								'&:hover': {color: 'primary.main'},
							}}
							onClick={() => handleSearch(username)}
						>
							<SearchIcon />
						</InputAdornment>
					),
				}}
				variant='standard'
				fullWidth
				placeholder='Знайти користувача..'
				autoComplete='off'
				onChange={e => setUsername(e.target.value)}
				onKeyDown={handleKey}
			/>
		</Box>
	);
};

export default Search;
