import {Box} from '@mui/material';
import React from 'react';
import ChatList from './ChatList';
import Search from './Search';

const Sidebar = () => {
	return (
		<Box sx={{flex: 1, borderRight: '1px solid #ccc'}}>
			<Search />
			<ChatList />
		</Box>
	);
};

export default Sidebar;
