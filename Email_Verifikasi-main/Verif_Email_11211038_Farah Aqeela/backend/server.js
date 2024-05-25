const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Konfigurasi nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '11211038@student.itk.ac.id',
        pass: 'farah12'
    }
});

// Endpoint untuk verifikasi email
app.post('/send-verification-email', (req, res) => {
    const { email } = req.body;

    // Buat token verifikasi (sebagai contoh menggunakan timestamp)
    const token = Date.now();

    // Simpan token ke database
    const sql = `INSERT INTO email_verifications (email, token) VALUES ('${email}', '${token}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);

        // Kirim email verifikasi
        const verificationLink = `http://localhost:5001/verify-email?token=${token}`;
        const mailOptions = {
            from: '11211038@student.itk.ac.id',
            to: email,
            subject: 'Verifikasi Email',
            text: `Harap klik link berikut untuk verifikasi email: ${verificationLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Gagal mengirim email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email verifikasi telah dikirim');
            }
        });
    });
});

// Endpoint untuk halaman konfirmasi verifikasi
app.get('/verify-email', (req, res) => {
    const { token } = req.query;

    // Verifikasi token dari database
    const sql = `SELECT * FROM email_verifications WHERE token = '${token}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send('Email berhasil diverifikasi');
        } else {
            res.send('Token tidak valid');
        }
    });
});

// Jalankan server
app.listen(5001, () => {
    console.log('Server started on port 5001');
});
