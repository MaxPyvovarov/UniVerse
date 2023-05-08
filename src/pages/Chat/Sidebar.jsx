import {Box} from '@mui/material';
import React, {useState} from 'react';
import ChatList from './ChatList';
import Search from './Search';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '../../firebase';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
	const [list, setList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const {user} = useAuth();

	const handleSearch = async username => {
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
			setList(response);
		} catch (error) {
			setError(error);
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
			<ChatList list={list} />
		</Box>
	);
};

export default Sidebar;
