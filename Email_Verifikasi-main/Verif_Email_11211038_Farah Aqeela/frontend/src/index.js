import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import VerifyEmail from './VerifyEmail';

ReactDOM.render(
    <Router>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
