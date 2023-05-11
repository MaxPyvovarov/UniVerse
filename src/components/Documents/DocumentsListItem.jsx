import React from 'react';
import {Box, Fab, Typography} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import {ref, getDownloadURL} from 'firebase/storage';
import {storage} from '../../firebase';

const DocumentsListItem = ({doc}) => {
	const onDownload = () => {
		getDownloadURL(ref(storage, doc.url))
			.then(url => {
				const xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = () => {
					const blob = xhr.response;
					const url = window.URL.createObjectURL(new Blob([blob]));
					const link = document.createElement('a');

					link.href = url;
					link.setAttribute('download', doc.name);

					document.body.appendChild(link);

					link.click();
					link.parentNode.removeChild(link);
				};
				xhr.open('GET', url);
				xhr.send();
			})
			.catch(error => {
				console.error(error);
			});
	};

	return (
		<Box
			sx={{
				background: '#f9f9f9',
				border: '1px solid rgba(0, 0, 0, 0.23)',
				borderRadius: '15px',
				padding: '15px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					gap: '10px',
					alignItems: 'center',
				}}
			>
				<Fab color='primary' size='medium' onClick={onDownload}>
					<DownloadIcon />
				</Fab>
				<Typography>{doc.name}</Typography>
			</Box>
			<Box textAlign='right'>
				<Typography sx={{opacity: 0.4}}>{doc.author}</Typography>
				<Typography sx={{opacity: 0.4}}>{doc.postedAt}</Typography>
			</Box>
		</Box>
	);
};

export default DocumentsListItem;
