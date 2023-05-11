import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import FolderIcon from '@mui/icons-material/Folder';

const pagesData = [
	{
		title: 'Чат',
		link: '/chat',
		icon: () => <ChatIcon sx={{width: 26, height: 26}} />,
	},
	{
		title: 'Люди',
		link: '/people',
		icon: () => <GroupIcon sx={{width: 26, height: 26}} />,
	},
	{
		title: 'Документи',
		link: '/documents',
		icon: () => <FolderIcon sx={{width: 26, height: 26}} />,
	},
];

export default pagesData;
