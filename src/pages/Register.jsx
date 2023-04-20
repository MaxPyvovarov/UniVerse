import {useState, useEffect} from 'react';
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
import CancelIcon from '@mui/icons-material/Cancel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Alert} from '@mui/material';
import {FormHelperText} from '@mui/material';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../firebase';
import useAuth from '../hooks/useAuth';

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [hasPreview, setHasPreview] = useState(false);
	const [error, setError] = useState('');

	const {login} = useAuth();

	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onBlur',
	});

	const navigate = useNavigate();

	useEffect(() => {
		navigate('/');
	}, []);

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const onSubmit = data => {
		data = {
			...data,
			avatar: document.querySelector('#avatar').files[0] || null,
		};
		console.log(data);

		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(userCredential => {
				const user = userCredential.user;
				login(user);
				localStorage.setItem('user', JSON.stringify(user));
			})
			.catch(error => {
				setError(error.message);
			});

		reset();
		setHasPreview(false);
	};

	const previewAvatar = event => {
		const file = event.target.files[0];
		if ((file && file?.type === 'image/jpeg') || file?.type === 'image/png') {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			setHasPreview(true);

			reader.onloadend = function (event) {
				document.querySelector('#avatar-preview').src = event.target.result;
			};
		} else {
			event.target.value = null;
			setHasPreview(false);
		}
	};

	return (
		<Box
			component='main'
			sx={{
				minHeight: '100vh',
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
						Реєстрація
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						sx={{mt: 1}}
					>
						<TextField
							margin='normal'
							fullWidth
							label="Ім'я *"
							autoComplete='none'
							{...register('firstName', {
								required: "Поле є обов'язковим",
								minLength: {
									value: 2,
									message: "Ім'я не може бути коротше 2 символів",
								},
								pattern: {
									value: /^[а-яієїґ'][^ъыэёЪЫЭЁ]+$/i,
									message: 'Можна використовувати тільки українські літери',
								},
							})}
							helperText={errors?.firstName?.message}
							error={!!errors?.firstName?.message}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Прізвище'
							autoComplete='none'
							{...register('lastName', {
								required: "Поле є обов'язковим",
								minLength: {
									value: 2,
									message: 'Прізвище не може бути коротше 2 символів',
								},
								pattern: {
									value: /^[а-яієїґ'][^ъыэёЪЫЭЁ]+$/i,
									message: 'Можна використовувати тільки українські літери',
								},
							})}
							helperText={errors?.lastName?.message}
							error={!!errors?.lastName?.message}
						/>
						<TextField
							margin='normal'
							required
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
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
							}}
						>
							<input
								style={{display: 'none'}}
								type='file'
								id='avatar'
								name='avatar'
								{...register('avatar')}
								accept='image/png, image/jpeg'
								onChange={event => previewAvatar(event)}
							/>
							<label
								htmlFor='avatar'
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '20px',
									cursor: 'pointer',
									width: 'fit-content',
								}}
							>
								{hasPreview ? (
									<img
										style={{maxWidth: '120px', marginTop: 20}}
										id='avatar-preview'
									/>
								) : (
									<img src='/add.png' alt='add' style={{maxWidth: '48px'}} />
								)}
								<Typography component='span' variant='body1'>
									{hasPreview
										? 'Змінити аватар'
										: "Додати аватар (не обов'язково)"}
								</Typography>
							</label>
							{hasPreview && (
								<CancelIcon
									onClick={() => {
										setHasPreview(false);
										document.querySelector('#avatar').value = null;
									}}
									sx={{
										cursor: 'pointer',
										fontSize: '24px',
										color: 'primary.main',
									}}
								/>
							)}
						</Box>
						{error && (
							<Alert severity='error' sx={{marginTop: 2}}>
								{error}
							</Alert>
						)}
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{mt: 3, mb: 2}}
							disabled={!isValid}
						>
							Зареєструватись
						</Button>
						<Grid container sx={{mt: 2, justifyContent: 'flex-end'}}>
							<Grid item>
								<Typography component='span' variant='body1'>
									Вже маєте акаунт?{' '}
								</Typography>
								<Link to='/login'>{'Увійти'}</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Register;
