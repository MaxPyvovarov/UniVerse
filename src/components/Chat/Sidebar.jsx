import {Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import ChatList from './ChatList';
import Search from './Search';
import {
	collection,
	query,
	where,
	getDocs,
	doc,
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
				console.error(error);
			}
		}
	};

	const handleSelect = async selectedUser => {
		await dispatch({type: 'SELECT_USER', payload: selectedUser});
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
