import {createContext, useState} from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	const login = newUser => {
		setUser(newUser);
	};

	const logout = () => {
		setUser(null);
	};

	const value = {user, login, logout};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
