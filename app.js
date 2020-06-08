const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const notesRoutes = require('./api/routes/notes');
const usersRoutes = require('./api/routes/users');

// Connect to DATABASE
mongoose.connect('mongodb+srv://srikar:srikar1999@node-note-api-muyyi.mongodb.net/notes_db?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

// REQUESTS logging middleware
app.use(morgan('dev'));

// BODY PARSER middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS access middleware
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
		return res.status(200).json({});
	}
	next();
});

// API routers middleware
app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

// ERROR handling middleware
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			status: error.status || 500,
			message: error.message
		}
	});
});

module.exports = app;