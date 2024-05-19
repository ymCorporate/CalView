import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

// Performance reporting
//reportWebVitals();
