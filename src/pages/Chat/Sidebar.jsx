import {Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ChatList from './ChatList';
import Search from './Search';
import {
	collection,
	query,
	where,
	getDoc,
	getDocs,
	updateDoc,
	serverTimestamp,
	doc,
	setDoc,
	onSnapshot,
} from 'firebase/firestore';
import {db} from '../../firebase';
import useAuth from '../../hooks/useAuth';
import useChat from '../../hooks/useChat';
import SearchedChatList from './SearchedChatList';

const Sidebar = () => {
	const [list, setList] = useState([]);
	const [searchedList, setSearchedList] = useState([]);

	const {user} = useAuth();
	const {dispatch} = useChat();

	useEffect(() => {
		const getList = () => {
			const unsub = onSnapshot(doc(db, 'userChats', user.uid), doc => {
				setList(doc.data());
			});
			return () => unsub();
		};

		user.uid && getList();
	}, [user.uid]);

	const handleSearch = async username => {
		if (username.trim() === '') {
			setSearchedList([]);
		} else {
			const q = query(
				collection(db, 'users'),
				where('displayName', '==', username)
			);

			try {
				const querySnapshot = await getDocs(q);
				let response = [];
				querySnapshot.forEach(doc => {
					response.push(doc.data());
				});
				setSearchedList(response);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleSelect = async selectedUser => {
		dispatch({type: 'CHANGE_USER', payload: selectedUser});
		const combinedId =
			user.uid > selectedUser.uid
				? user.uid + selectedUser.uid
				: selectedUser.uid + user.uid;
		try {
			const res = await getDoc(doc(db, 'chats', combinedId));

			if (!res.exists()) {
				await setDoc(doc(db, 'chats', combinedId), {messages: []});

				await updateDoc(doc(db, 'userChats', user.uid), {
					[combinedId + '.userInfo']: {
						uid: selectedUser.uid,
						displayName: selectedUser.displayName,
						photoURL: selectedUser.photoURL,
					},
					[combinedId + '.date']: serverTimestamp(),
				});

				await updateDoc(doc(db, 'userChats', selectedUser.uid), {
					[combinedId + '.userInfo']: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[combinedId + '.date']: serverTimestamp(),
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box
			sx={{
				flex: 1,
				borderRight: '1px solid #ccc',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Search handleSearch={handleSearch} />
			{searchedList.length > 0 ? (
				<SearchedChatList list={searchedList} handleSelect={handleSelect} />
			) : (
				<ChatList list={Object.entries(list)} handleSelect={handleSelect} />
			)}
		</Box>
	);
};

export default Sidebar;
