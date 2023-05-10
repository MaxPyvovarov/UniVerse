import {createContext, useReducer} from 'react';
import useAuth from '../../hooks/useAuth';

export const ChatContext = createContext({});

const ChatProvider = ({children}) => {
	const {user} = useAuth();

	const INITIAL_STATE = {
		chatId: 'null',
		user: {},
	};

	const chatReducer = (state, action) => {
		switch (action && action.type) {
			case 'CHANGE_USER':
				return {
					user: action.payload,
					chatId:
						user.uid > action.payload.uid
							? user.uid + action.payload.uid
							: action.payload.uid + user.uid,
				};
			case 'RESET_USER':
				return INITIAL_STATE;

			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
	console.log('state', state);

	return (
		<ChatContext.Provider value={{data: state, dispatch}}>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatProvider;
