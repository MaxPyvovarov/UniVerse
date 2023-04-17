import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import {Alert} from '@mui/material';
import {FormHelperText} from '@mui/material';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {auth} from '../firebase';
import useAuth from '../hooks/useAuth';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const {login} = useAuth();

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
				console.log(user);
				login(user);
				localStorage.setItem('user', JSON.stringify(user));
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
					<Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>
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
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									{'Забули пароль?'}
								</Link>
							</Grid>
							<Grid item>
								<Link to='/'>{'Реєстрація'}</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
