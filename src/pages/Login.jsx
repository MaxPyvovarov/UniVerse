import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const handleSubmit = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			firstName: data.get('firstName'),
			lastName: data.get('lastName'),
			email: data.get('email'),
			password: data.get('password'),
			avatar: data.get('avatar'),
		});
	};

	return (
		<Box
			component='main'
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'primary.main',
				margin: 0,
				padding: '10px 15px',
			}}
		>
			<Box
				sx={{
					maxWidth: '550px',
					backgroundColor: '#fff',
					borderRadius: '20px',
					padding: 4,
				}}
			>
				<CssBaseline />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{m: 1, bgcolor: 'primary.main'}}>U</Avatar>
					<Typography component='h1' variant='h5'>
						Вхід
					</Typography>
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Email'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<FormControl
							fullWidth
							margin='normal'
							variant='outlined'
							sx={{mb: 2}}
						>
							<InputLabel htmlFor='outlined-adornment-password'>
								Пароль
							</InputLabel>
							<OutlinedInput
								required
								fullWidth
								name='password'
								label='Пароль'
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{mt: 3, mb: 2}}
						>
							Увійти
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									{'Забули пароль?'}
								</Link>
							</Grid>
							<Grid item>
								<Link href='#' variant='body2'>
									{'Реєстрація'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
