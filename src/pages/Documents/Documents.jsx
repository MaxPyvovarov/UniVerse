import React, {useState, useEffect} from 'react';
import {Box, Typography, Button, Alert} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import {onSnapshot, collection, orderBy, query} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import {db, storage} from '../../firebase';
import useAuth from '../../hooks/useAuth';
import moment from 'moment/moment';

import DocumentsListItem from './DocumentsListItem';

const docTypes = [
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.ms-powerpoint',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const Documents = () => {
	const [documents, setDocuments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const {user} = useAuth();

	const onUpload = async () => {
		const newDoc = document.querySelector('#document').files[0] || null;
		const timeStamp = new Date();
		let minutes = 0;

		if (timeStamp.getMinutes() > 9) minutes = timeStamp.getMinutes();
		else minutes = '0' + timeStamp.getMinutes();

		let date =
			moment().format('DD.MM.YY ') +
			`${timeStamp.getHours()}` +
			':' +
			`${minutes}`;

		const storageRef = ref(storage, `documents/${timeStamp.getTime()}`);

		try {
			if (newDoc && docTypes.includes(newDoc.type)) {
				uploadBytes(storageRef, newDoc).then(async snapshot => {
					await getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
						async url => {
							await setDoc(doc(db, 'documents', `${timeStamp.getTime()}`), {
								name: newDoc.name,
								_id: timeStamp.getTime(),
								url,
								author: user.displayName,
								postedAt: date,
							});
						}
					);
				});
				document.querySelector('#document').value = null;
			}
		} catch (e) {
			setError(e);
		}
	};

	useEffect(() => {
		const q = query(collection(db, 'documents'), orderBy('_id', 'desc'));
		const unsub = onSnapshot(q, doc => {
			let response = [];
			doc.forEach(d => {
				response.push(d.data());
			});

			setDocuments(response);
			setIsLoading(false);
		});

		return () => {
			unsub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '15px 10px',
			}}
		>
			{error && (
				<Alert severity='error' sx={{marginTop: 2}}>
					{error}
				</Alert>
			)}
			<Box
				sx={{
					padding: '16px 16px 0',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography component='h1' variant='h3' marginBottom={4}>
					Документи
				</Typography>

				<label
					htmlFor='document'
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '20px',
						cursor: 'pointer',
						width: 'fit-content',
					}}
				>
					<input
						style={{display: 'none'}}
						type='file'
						id='document'
						name='document'
						accept='.pdf, .doc, .docx, .ppt, .pptx'
						onChange={onUpload}
					/>

					<Button
						variant='contained'
						onClick={() =>
							document.querySelector('label[for="document"]').click()
						}
					>
						+ Додати документ
					</Button>
				</label>
			</Box>
			{isLoading && (
				<CircularProgress
					style={{width: 72, height: 72, alignSelf: 'center'}}
				/>
			)}
			{!isLoading && documents.length === 0 && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						opacity: 0.6,
					}}
				>
					<FindInPageIcon sx={{width: 100, height: 100}} />
					<Typography component='p' variant='h6'>
						Репозиторій порожній
					</Typography>
				</Box>
			)}
			<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
				{documents.length > 0 &&
					documents.map(doc => <DocumentsListItem key={doc._id} doc={doc} />)}
			</Box>
		</Box>
	);
};

export default Documents;
