import * as React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
	ListItemText,
	ListItemIcon,
	Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import {Link, useNavigate} from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import pagesData from './pagesData';
import useChat from '../../../hooks/useChat';

const Header = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const {user, logout} = useAuth();
	const {dispatch} = useChat();
	const navigate = useNavigate();

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position='sticky' color='info' sx={{p: {xs: 1, md: 'none'}}}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
					<Typography
						variant='h6'
						noWrap
						component={Link}
						to='/'
						sx={{
							mr: 4,
							display: {xs: 'none', md: 'flex'},
							fontFamily: 'Montserrat, sans-serif',
							fontWeight: 700,
							letterSpacing: '.1rem',
							color: 'inherit',
							textDecoration: 'none',
							userSelect: 'none',
						}}
					>
						UniVerse
					</Typography>

					<Box sx={{display: {xs: 'flex', md: 'none'}}}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon
								sx={{
									width: 36,
									height: 36,
								}}
							/>
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: {xs: 'block', md: 'none'},
							}}
						>
							{pagesData.map(page => (
								<MenuItem
									key={page.title}
									component={Link}
									onClick={handleCloseNavMenu}
									to={page.link}
								>
									<ListItemIcon
										sx={{
											color: 'inherit',
											textDecoration: 'none',
											display: 'flex',
										}}
									>
										<page.icon />
									</ListItemIcon>
									<ListItemText>{page.title}</ListItemText>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant='h5'
						noWrap
						component={Link}
						to='/'
						sx={{
							display: {xs: 'flex', md: 'none'},
							fontFamily: 'Montserrat, sans-serif',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
							textAlign: 'center',
							paddingX: {xs: 1, md: 3},
							paddingY: 1,
						}}
					>
						UniVerse
					</Typography>
					<Box
						sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, gap: '15px'}}
					>
						{pagesData.map(page => (
							<Button
								key={page.title}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: 'white',
									display: 'flex',
									fontSize: 16,
									gap: '5px',
								}}
								component={Link}
								to={page.link}
							>
								<page.icon />
								{page.title}
							</Button>
						))}
					</Box>

					<Box
						sx={{
							flexGrow: 0,
							display: 'flex',
							alignItems: 'center',
							gap: '15px',
						}}
					>
						<Typography
							sx={{display: {xs: 'none', md: 'block'}, fontWeight: 700}}
						>
							{user.displayName}
						</Typography>
						<Tooltip>
							<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
								<Avatar
									alt={user.displayName}
									src={user?.photoURL}
									sx={{width: 56, height: 56}}
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{mt: '45px'}}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem sx={{display: {xs: 'flex', md: 'none'}}}>
								<Typography sx={{fontWeight: 700}}>
									{user.displayName}
								</Typography>
							</MenuItem>
							<Divider sx={{display: {xs: 'flex', md: 'none'}}} />
							<MenuItem onClick={handleCloseUserMenu}>
								<AccountCircleOutlinedIcon sx={{mr: 0.5}} />
								<Typography
									sx={{color: 'inherit', textDecoration: 'none'}}
									onClick={() =>
										navigate(`/profile/${user.uid}`, {state: user.uid})
									}
								>
									Профіль
								</Typography>
							</MenuItem>
							<MenuItem onClick={logout}>
								<LogoutOutlinedIcon sx={{mr: 0.5}} />
								<Typography
									textAlign='center'
									onClick={() => dispatch({type: 'RESET_USER'})}
								>
									Вийти
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
