import {Box} from '@mui/material';
import React from 'react';
import Chats from './Chats';
import Search from './Search';

const Sidebar = () => {
	return (
		<Box sx={{flex: 1, borderRight: '1px solid #ccc'}}>
			<Search />
			<Chats />
		</Box>
	);
};

export default Sidebar;
