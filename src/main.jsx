import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/AuthProvider.jsx';
import { FeedProvider } from './providers/FeedProvider.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <FeedProvider>
                <App />
            </FeedProvider>
        </AuthProvider>
    </React.StrictMode>
);
