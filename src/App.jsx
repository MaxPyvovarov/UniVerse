import {CssBaseline} from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import useAuth from './hooks/useAuth';
import Documents from './pages/Documents/Documents';
import ChatPage from './pages/Chat/ChatPage';
import Groups from './pages/Groups';
import Profile from './pages/Profile';

function App() {
	const {user} = useAuth();

	return (
		<BrowserRouter>
			<CssBaseline />
			<Routes>
				{user ? (
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='/chat' element={<ChatPage />} />
						<Route path='/groups' element={<Groups />} />
						<Route path='/documents' element={<Documents />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='*' element={<Home />} />
					</Route>
				) : (
					<>
						<Route path='/' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route path='/*' element={<Register />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
