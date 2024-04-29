import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import {HashRouter} from "react-router-dom";
import {AuthProvider} from './services/authProvider';
import {GlobalStateProvider} from './services/globalStateProvider';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <GlobalStateProvider>
            <AuthProvider>
                <HashRouter>
                    <App/>
                </HashRouter>
            </AuthProvider>
        </GlobalStateProvider>
    </React.StrictMode>
);

