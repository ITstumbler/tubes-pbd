//      C:\Users\ACER\Documents\react\penambangan\backend node websitenode.js
//      C:\Users\ACER\Documents\react\penambangan npm start
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 8082;
const mysql = require('mysql');
// const jwt = require('jsonwebtoken');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const crypto = require('crypto');

let userdata = {};

app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "smpru_user",
    password: "password_untuk_smpru",
    database: "penambangan"
});

app.use(multer().array());
app.use(express.json());
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

dotenv.config();
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.get('/test', (req, res) => {
    res.status(200).json({
        message: "Halooooo halo halo halo",
    });
});

app.get('/viewtable', (req, res) => {

    let sqlQueryToUse = "SELECT * FROM tambang ORDER BY tanggal_dibuka DESC LIMIT 200";
    
    const tableToView = req.query.table;

    if(tableToView == 2) {
        sqlQueryToUse = "SELECT pekerja.id_pekerja, pekerja.nama, pekerja.status, pekerja.tanggal_diterima, tambang.nama nama_tambang FROM pekerja INNER JOIN tambang ON tambang.id_tambang = pekerja.tambang ORDER BY status DESC LIMIT 200;";
    }
    else if(tableToView == 3) {
        sqlQueryToUse = "SELECT alat.id_alat, alat.tipe, alat.status, alat.tanggal_dibeli, alat.harga, pekerja.nama FROM alat INNER JOIN pekerja ON pekerja.id_pekerja = alat.dimiliki ORDER BY status DESC LIMIT 200;";
    }
    else if(tableToView == 4) {
        sqlQueryToUse = "SELECT * FROM mineral ORDER BY nama ASC LIMIT 200";
    }
    else if(tableToView == 5) {
        sqlQueryToUse = "SELECT penghasilan_tambang.id_penghasilan, penghasilan_tambang.tanggal, penghasilan_tambang.jumlah_penghasilan_kg, tambang.nama nama_tambang, mineral.nama nama_mineral FROM penghasilan_tambang INNER JOIN tambang ON tambang.id_tambang = penghasilan_tambang.id_tambang INNER JOIN mineral ON mineral.id_mineral = penghasilan_tambang.id_mineral ORDER BY tanggal DESC LIMIT 200";
    }

    //Dropdown selections
    else if(tableToView == 6) {
        sqlQueryToUse = "SELECT id_tambang, nama FROM tambang ORDER BY nama ASC LIMIT 200";
    }
    else if(tableToView == 7) {
        sqlQueryToUse = "SELECT id_pekerja, nama FROM pekerja ORDER BY nama ASC LIMIT 200";
    }
    else if(tableToView == 8) {
        sqlQueryToUse = "SELECT id_mineral, nama FROM mineral ORDER BY nama ASC LIMIT 200";
    }


    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        if (rows) {
            //if(tableToView == 14) console.log(rows);
            res.status(200).json(rows);
        }
    });
});

app.get('/viewentry', (req, res) => {

    let sqlQueryToUse = "SELECT * FROM tambang WHERE id_tambang = " + req.query.id;
    
    const tableToView = req.query.table;

    if(tableToView == 2) {
        sqlQueryToUse = "SELECT * FROM pekerja WHERE id_pekerja = " + req.query.id;
    }
    else if(tableToView == 3) {
        sqlQueryToUse = "SELECT * FROM alat WHERE id_alat = " + req.query.id;
    }
    else if(tableToView == 4) {
        sqlQueryToUse = "SELECT * FROM mineral WHERE id_mineral = " + req.query.id;
    }
    else if(tableToView == 5) {
        sqlQueryToUse = "SELECT * FROM penghasilan_tambang WHERE id_penghasilan = " + req.query.id;
    }
    

    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        if (rows) {
            // console.log(rows);
            if(tableToView == 1) {
                const day = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(rows[0].tanggal_dibuka);
                const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(rows[0].tanggal_dibuka);
                const year = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(rows[0].tanggal_dibuka);
                rows[0].tanggal_dibuka = `${day}-${month}-${year}`;
            }
            if(tableToView == 2) {
                const day = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(rows[0].tanggal_diterima);
                const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(rows[0].tanggal_diterima);
                const year = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(rows[0].tanggal_diterima);
                rows[0].tanggal_diterima = `${day}-${month}-${year}`;
            }
            if(tableToView == 3) {
                const day = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(rows[0].tanggal_dibeli);
                const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(rows[0].tanggal_dibeli);
                const year = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(rows[0].tanggal_dibeli);
                rows[0].tanggal_dibeli = `${day}-${month}-${year}`;
            }
            if(tableToView == 5) {
                const day = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(rows[0].tanggal);
                const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(rows[0].tanggal);
                const year = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(rows[0].tanggal);
                rows[0].tanggal = `${day}-${month}-${year}`;
            }
            //console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    });
});


app.post('/addminedata', (req, res) => {
    
    const nama = req.body.nama;
    const tanggal_dibuka = req.body.tanggal_dibuka;
    const status = req.body.status;
    const lokasi = req.body.lokasi;

    let sqlQueryToUse = "INSERT INTO tambang (nama, tanggal_dibuka, status, lokasi) VALUES ('"+ nama +"', '" + tanggal_dibuka + "', '" + status + "', '" + lokasi + "')";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data tambang telah disimpan.", success: 2 });
        }
    });
});

app.post('/editminedata', (req, res) => {
    
    const nama = req.body.nama;
    const tanggal_dibuka = req.body.tanggal_dibuka;
    const status = req.body.status;
    const lokasi = req.body.lokasi;

    let sqlQueryToUse = "UPDATE tambang SET nama = '"+ nama +"', tanggal_dibuka = '" + tanggal_dibuka + "', status = '" + status + "', lokasi = '" + lokasi + "' WHERE id_tambang = " + req.query.id + "";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data tambang telah diedit.", success: 2 });
        }
    });
});

app.post('/addworkerdata', (req, res) => {
    
    const nama = req.body.nama;
    const tanggal_diterima = req.body.tanggal_diterima;
    const status = req.body.status;
    const tambang = req.body.tambang;

    let sqlQueryToUse = "INSERT INTO pekerja (nama, tanggal_diterima, status, tambang) VALUES ('"+ nama +"', '" + tanggal_diterima + "', '" + status + "', '" + tambang + "')";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data pekerja telah disimpan.", success: 2 });
        }
    });
});

app.post('/editworkerdata', (req, res) => {
    
    const nama = req.body.nama;
    const tanggal_diterima = req.body.tanggal_diterima;
    const status = req.body.status;
    const tambang = req.body.tambang;

    let sqlQueryToUse = "UPDATE pekerja SET nama = '"+ nama +"', tanggal_diterima = '" + tanggal_diterima + "', status = '" + status + "', tambang = '" + tambang + "' WHERE id_pekerja = " + req.query.id + "";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data pekerja telah diedit.", success: 2 });
        }
    });
});

app.post('/addtooldata', (req, res) => {
    
    const tipe = req.body.tipe;
    const harga = req.body.harga;
    const tanggal_dibeli = req.body.tanggal_dibeli;
    const status = req.body.status;
    const dimiliki = req.body.dimiliki;

    let sqlQueryToUse = "INSERT INTO alat (tipe, harga, tanggal_dibeli, status, dimiliki) VALUES ('"+ tipe +"', " + harga + ", '" + tanggal_dibeli + "', '" + status + "', '" + dimiliki + "')";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data alat telah disimpan.", success: 2 });
        }
    });
});

app.post('/edittooldata', (req, res) => {
    
    const tipe = req.body.tipe;
    const harga = req.body.harga;
    const tanggal_dibeli = req.body.tanggal_dibeli;
    const status = req.body.status;
    const dimiliki = req.body.dimiliki;

    let sqlQueryToUse = "UPDATE alat SET tipe = '"+ tipe +"', harga = " + harga + ", tanggal_dibeli = '" + tanggal_dibeli + "', status = '" + status + "', dimiliki = '" + dimiliki + "' WHERE id_alat = " + req.query.id + "";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data alat telah diedit.", success: 2 });
        }
    });
});

app.post('/addmineraldata', (req, res) => {
    
    const nama = req.body.nama;
    const harga_kg = req.body.harga_kg;
    const jenis = req.body.jenis;

    let sqlQueryToUse = "INSERT INTO mineral (nama, harga_kg, jenis) VALUES ('"+ nama + "', '" + harga_kg + "', '" + jenis + "')";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data mineral telah disimpan.", success: 2 });
        }
    });
});

app.post('/editmineraldata', (req, res) => {
    
    const nama = req.body.nama;
    const harga_kg = req.body.harga_kg;
    const jenis = req.body.jenis;

    let sqlQueryToUse = "UPDATE mineral SET nama = '" + nama + "', harga_kg = '" + harga_kg + "', jenis = '" + jenis + "' WHERE id_mineral = " + req.query.id + "";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data mineral telah diedit.", success: 2 });
        }
    });
});

app.post('/addearningsdata', (req, res) => {
    
    const id_tambang = req.body.id_tambang;
    const id_mineral = req.body.id_mineral;
    const tanggal = req.body.tanggal;
    const jumlah_penghasilan_kg = req.body.jumlah_penghasilan_kg;

    let sqlQueryToUse = "INSERT INTO penghasilan_tambang (id_tambang, id_mineral, tanggal, jumlah_penghasilan_kg) VALUES ("+ id_tambang +", " + id_mineral + ", '" + tanggal + "', " + jumlah_penghasilan_kg + ")";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data penghasilan tambang telah disimpan.", success: 2 });
        }
    });
});

app.post('/editearningsdata', (req, res) => {
    
    const id_tambang = req.body.id_tambang;
    const id_mineral = req.body.id_mineral;
    const tanggal = req.body.tanggal;
    const jumlah_penghasilan_kg = req.body.jumlah_penghasilan_kg;

    let sqlQueryToUse = "UPDATE penghasilan_tambang SET id_tambang = "+ id_tambang +", id_mineral = " + id_mineral + ", tanggal = '" + tanggal + "', jumlah_penghasilan_kg = " + jumlah_penghasilan_kg + " WHERE id_penghasilan = " + req.query.id + "";
    con.query(sqlQueryToUse, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "Gagal. Error tidak diketahui.", success: 1 });
        }
        else {
            res.status(200).json({ msg: "Data penghasilan tambang telah diedit.", success: 2 });
        }
    });
});

app.post('/deleteearningsdata', (req, res) => {
    const earningsIdToDelete = req.body.earningsId;
    let rowThatMatchesWithEarningsId = -1;
    const sqlQuerySelect = "SELECT * FROM penghasilan_tambang";
    con.query(sqlQuerySelect, (err, rows) => {
        for(i in rows) {
            if(earningsIdToDelete == rows[i].id_penghasilan) {
                console.log("Penghasilan cocok ditemukan");
                rowThatMatchesWithEarningsId = i;
                break;
            }
        }
        if(rowThatMatchesWithEarningsId == -1) {
            console.log("Tidak ada penghasilan yang ditemukan dengan id tersebut!");
        }
        else {
            const sqlQueryDelete = "DELETE FROM penghasilan_tambang WHERE id_penghasilan = " + earningsIdToDelete;
            con.query(sqlQueryDelete);
            res.status(200).json({
                msg: "Data penghasilan sukses dihapuskan.",
                success: 2
            });
        }
        if (err) {
            res.status(500).json({
                msg: "Error tidak diketahui.",
                success: 1
            });
        }
        else if(rowThatMatchesWithEarningsId == -1) {
            res.status(400).json({
                msg: "Tidak ditemukan penghasilan dengan ID tersebut.",
                success: 1
            });
        }
    });
});

app.listen(port, () => {
    console.log("Backend tubes PBD berjalan!");
});