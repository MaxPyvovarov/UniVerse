import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_UNIVERSE_API_KEY,
	authDomain: import.meta.env.VITE_UNIVERSE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_UNIVERSE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_UNIVERSE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_UNIVERSE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_UNIVERSE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
