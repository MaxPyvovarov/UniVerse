import React from 'react';
import {Box, InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
	return (
		<Box
			sx={{
				padding: '15px 0 0 1px',
			}}
		>
			<TextField
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					),
				}}
				variant='standard'
				fullWidth
				placeholder='Знайти користувача..'
				autoComplete='off'
			/>
		</Box>
	);
};

export default Search;
