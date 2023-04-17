import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<header>
				<Link to='/'>Home</Link>
			</header>
			<Outlet />
			<footer>2023</footer>
		</>
	);
};

export default Layout;
