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
import {FormHelperText} from '@mui/material';
import {useForm} from 'react-hook-form';

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [hasPreview, setHasPreview] = useState(false);

	const {
		register,
		formState: {errors},
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
		data = {...data, avatar: document.querySelector('#avatar').files[0]};
		console.log(data);
		reset();
		setHasPreview(false);
	};

	const previewAvatar = () => {
		const reader = new FileReader();
		reader.readAsDataURL(document.querySelector('#avatar').files[0]);
		setHasPreview(true);

		reader.onloadend = function (event) {
			document.querySelector('#avatar-preview').src = event.target.result;
		};
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
							label="Ім'я"
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
						<input
							style={{display: 'none'}}
							type='file'
							id='avatar'
							name='avatar'
							{...register('avatar')}
							accept='image/*'
							onChange={previewAvatar}
						/>
						<label
							htmlFor='avatar'
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '15px',
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

						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{mt: 3, mb: 2}}
						>
							Зареєструватись
						</Button>
						<Grid container sx={{mt: 2}}>
							<Grid item>
								<Typography component='span' variant='body2'>
									Вже маєте акаунт?{' '}
								</Typography>
								<Link href='#' variant='body2'>
									{'Увійти'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Register;
