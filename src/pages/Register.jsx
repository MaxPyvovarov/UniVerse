import {useState, useEffect} from 'react';
import {
	Avatar,
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	OutlinedInput,
	InputAdornment,
	InputLabel,
	IconButton,
	FormControl,
	Alert,
	FormHelperText,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';

import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db, storage} from '../firebase';

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [hasPreview, setHasPreview] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onBlur',
	});

	useEffect(() => {
		navigate('/');
	}, []);

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const onSubmit = async data => {
		data = {
			...data,
			avatar: document.querySelector('#avatar').files[0] || null,
		};

		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			const user = res.user;
			const displayName = `${data.firstName} ${data.lastName}`;

			const storageRef = ref(storage, `avatars/${user.uid}`);

			if (data.avatar) {
				uploadBytes(storageRef, data.avatar).then(async snapshot => {
					await getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
						async url => {
							await updateProfile(user, {
								displayName,
								photoURL: url,
							});

							await setDoc(doc(db, 'users', user.uid), {
								displayName,
								uid: user.uid,
								email: data.email,
								photoURL: url,
							});
						}
					);
				});
			} else {
				await updateProfile(user, {
					displayName,
				});

				await setDoc(doc(db, 'users', user.uid), {
					displayName,
					uid: user.uid,
					email: data.email,
				});
			}
			await setDoc(doc(db, 'userChats', user.uid), {});

			navigate('/login', {state: true});
		} catch (error) {
			setError(error.message);
		}

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
							autoComplete='off'
							{...register('firstName', {
								required: "Поле є обов'язковим",
								minLength: {
									value: 2,
									message: "Ім'я не може бути коротше 2 символів",
								},
								maxLength: {
									value: 15,
									message: "Занадто довге ім'я",
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
							autoComplete='off'
							{...register('lastName', {
								required: "Поле є обов'язковим",
								minLength: {
									value: 2,
									message: 'Прізвище не може бути коротше 2 символів',
								},
								maxLength: {
									value: 15,
									message: 'Занадто довге прізвище',
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
