// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import books from './routes/api/books';
// //const books = require('./routes/api/books');

// const app = express();
// app.use(bodyParser.json({ limit: "30mb" , extended: true}));
// app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
// app.use(cors());
// dotenv.config();

// app.get('/', (req, res) => res.send('Hello world!'));

// app.use('/api/books', books);
// const PORT = process.env.PORT || 8000;
// mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
// .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify',false);

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8020;

app.listen(port, () => console.log(`Server running on port ${port}`));

