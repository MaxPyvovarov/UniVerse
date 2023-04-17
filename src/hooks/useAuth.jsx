import {useContext} from 'react';
import {AuthContext} from '../components/hoc/AuthProvider';

const useAuth = () => {
	return useContext(AuthContext);
};

export default useAuth;
