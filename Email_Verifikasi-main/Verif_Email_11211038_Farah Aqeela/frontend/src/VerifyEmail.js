import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        axios.get(`http://localhost:5000/verify-email?token=${token}`)
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                setMessage('Verifikasi gagal');
            });
    }, [searchParams]);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default VerifyEmail;
