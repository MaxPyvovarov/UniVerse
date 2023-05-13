import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header/Header';
import {Box} from '@mui/material';

const Layout = () => {
	return (
		<>
			<Header />
			<Box
				sx={{
					height: '100%',
					minHeight: 'calc(100vh - 88px)',
					display: 'flex',
					justifyContent: 'center',
					padding: '20px 15px',
					background: "url('/background.png')",
				}}
			>
				<Box
					sx={{
						width: '1200px',
						borderRadius: '15px',
						background: '#fff',
						boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, .3)',
						maxHeight: {sm: '80vh', md: '85vh'},
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</>
	);
};

export default Layout;
