import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApiProvider } from './providers/ApiProvider.jsx';
import { AuthProvider } from './providers/AuthProvider.jsx';
import { FeedProvider } from './providers/FeedProvider.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApiProvider>
            <AuthProvider>
                <FeedProvider>
                    <App />
                </FeedProvider>
            </AuthProvider>
        </ApiProvider>
    </React.StrictMode>
);
