import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [email, setEmail] = useState('');

    const handleVerifyEmail = () => {
        axios.post('http://localhost:5001/send-verification-email', { email })
            .then(response => {
                alert('Harap cek email untuk link verifikasi');
            })
            .catch(error => {
                console.error('Ada kesalahan!', error);
            });
    };

    return (
        <div className="App">
            <h1>Verifikasi Email</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
            />
            <button onClick={handleVerifyEmail}>Verifikasi Email</button>
        </div>
    );
}

export default App;
