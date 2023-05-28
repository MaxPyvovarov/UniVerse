import React, {useState} from 'react';
import {Box, TextField, InputAdornment} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useAuth from '../../hooks/useAuth';
import useChat from '../../hooks/useChat';
import {
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc,
	getDoc,
	setDoc,
} from 'firebase/firestore';
import {db} from '../../firebase';
import moment from 'moment';

const Input = () => {
	const {user} = useAuth();
	const {data} = useChat();
	const [text, setText] = useState('');

	const handleSend = async () => {
		if (text.trim() !== '') {
			const timeStamp = new Date();
			let minutes = 0;

			if (timeStamp.getMinutes() > 9) minutes = timeStamp.getMinutes();
			else minutes = '0' + timeStamp.getMinutes();

			let date =
				moment().format('DD.MM.YY ') +
				`${timeStamp.getHours()}` +
				':' +
				`${minutes}`;

			setText('');

			try {
				const res = await getDoc(doc(db, 'chats', data.chatId));

				if (!res.exists()) {
					await setDoc(doc(db, 'chats', data.chatId), {messages: []});

					await updateDoc(doc(db, 'userChats', user.uid), {
						[data.chatId + '.userInfo']: {
							uid: data.user.uid,
							displayName: data.user.displayName,
							photoURL: data.user.photoURL || null,
						},
						[data.chatId + '.date']: serverTimestamp(),
						[data.chatId + '.lastMessage']: text,
					});

					await updateDoc(doc(db, 'userChats', data.user.uid), {
						[data.chatId + '.userInfo']: {
							uid: user.uid,
							displayName: user.displayName,
							photoURL: user.photoURL || null,
						},
						[data.chatId + '.date']: serverTimestamp(),
						[data.chatId + '.lastMessage']: text,
					});
				} else {
					await updateDoc(doc(db, 'userChats', user.uid), {
						[data.chatId + '.lastMessage']: text,
						[data.chatId + '.date']: serverTimestamp(),
					});

					await updateDoc(doc(db, 'userChats', data.user.uid), {
						[data.chatId + '.lastMessage']: text,
						[data.chatId + '.date']: serverTimestamp(),
					});
				}

				await updateDoc(doc(db, 'chats', data.chatId), {
					messages: arrayUnion({
						id: new Date().getTime(),
						text,
						senderId: user.uid,
						date,
					}),
				});
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleKey = e => {
		if (e.key === 'Enter') {
			handleSend();
		}
	};

	return (
		<Box
			sx={{
				mt: 'auto',
				paddingY: 2,
				paddingX: 1,
				borderTop: '1px solid #ccc',
			}}
		>
			<TextField
				autoComplete='off'
				variant='outlined'
				InputProps={{
					sx: {
						bgcolor: '#f9f9f9',
						pr: 1,
					},
					endAdornment: (
						<InputAdornment
							position='start'
							onClick={handleSend}
							sx={{
								cursor: 'pointer',
								paddingLeft: '5px',
								transition: 'color .2s ease-in-out',
								'&:hover': {
									color: 'primary.main',
								},
							}}
						>
							<SendIcon />
						</InputAdornment>
					),
				}}
				fullWidth
				onChange={e => setText(e.target.value)}
				value={text}
				onKeyDown={handleKey}
				placeholder='Написати повідомлення..'
			/>
		</Box>
	);
};

export default Input;
