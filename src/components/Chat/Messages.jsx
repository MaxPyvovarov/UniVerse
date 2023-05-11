import React, {useState, useEffect} from 'react';
import Message from './Message';
import {Box} from '@mui/material';
import useChat from '../../hooks/useChat';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebase';

const Messages = () => {
	const [messages, setMessages] = useState([]);
	const {data} = useChat();

	useEffect(() => {
		setMessages([]);
		const unsub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
			doc.exists() ? setMessages(doc.data().messages) : setMessages([]);
		});

		return () => unsub();
	}, [data.chatId]);

	return (
		<Box
			sx={{
				padding: '15px',
				backgroundColor: '#fff',
				overflowY: 'scroll',
				height: '100%',
				flexGrow: 1,
			}}
		>
			{messages?.map(msg => (
				<Message msg={msg} key={msg.id} />
			))}
		</Box>
	);
};

export default Messages;
