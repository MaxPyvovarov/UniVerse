import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout/Layout';
import Home from './components/Home';
import useAuth from './hooks/useAuth';

function App() {
	const {user} = useAuth();
	console.log(localStorage.getItem('user'));

	return (
		<BrowserRouter>
			<Routes>
				{user ? (
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
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
