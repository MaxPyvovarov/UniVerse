import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './components/hoc/AuthProvider';
import ChatProvider from './components/hoc/ChatContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<ChatProvider>
				<App />
			</ChatProvider>
		</AuthProvider>
	</React.StrictMode>
);
