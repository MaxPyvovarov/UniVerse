import {useContext} from 'react';
import {ChatContext} from '../components/hoc/ChatContext';

const useChat = () => {
	return useContext(ChatContext);
};

export default useChat;
