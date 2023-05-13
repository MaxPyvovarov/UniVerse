import {useState} from 'react';
import {
	Avatar,
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormControl,
	FormHelperText,
	InputLabel,
	Alert,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {useForm} from 'react-hook-form';
import {Link, useLocation} from 'react-router-dom';

import {auth} from '../firebase';
import useAuth from '../hooks/useAuth';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const {login} = useAuth();
	const location = useLocation();

	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onBlur',
	});

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const onSubmit = data => {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(userCredential => {
				const user = userCredential.user;
				login(user);
				sessionStorage.setItem('user', JSON.stringify(user));
			})
			.catch(error => {
				setError(error.message);
			});

		reset();
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
					<Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>
						{location.state && (
							<Alert severity='success'>
								Реєстрація успішна! Ви можете увійти у свій акаунт
							</Alert>
						)}
						<TextField
							margin='normal'
							fullWidth
							label='Email'
							autoComplete='email'
							{...register('email', {
								required: "Поле є обов'язковим",
								pattern: {
									value:
										/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: 'Введіть коректну email-адресу',
								},
							})}
							helperText={errors?.email?.message}
							error={!!errors?.email?.message}
						/>
						<FormControl
							fullWidth
							margin='normal'
							variant='outlined'
							sx={{mb: 2}}
							error={!!errors?.password?.message}
						>
							<InputLabel htmlFor='outlined-adornment-password'>
								Пароль
							</InputLabel>
							<OutlinedInput
								required
								fullWidth
								label='Пароль'
								type={showPassword ? 'text' : 'password'}
								{...register('password', {
									required: "Поле є обов'язковим",
									minLength: {
										value: 8,
										message: 'Пароль не може бути коротше 8 символів',
									},
								})}
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
							{!!errors?.password?.message && (
								<FormHelperText id='component-helper-text'>
									{errors.password.message}
								</FormHelperText>
							)}
						</FormControl>
						{error && <Alert severity='error'>{error}</Alert>}
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{mt: 3, mb: 2}}
							disabled={!isValid}
						>
							Увійти
						</Button>
						<Box textAlign='right'>
							<Link to='/'>{'Реєстрація'}</Link>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
