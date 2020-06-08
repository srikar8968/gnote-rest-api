/*
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||		IN DEVELOPMENT
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({ msg: 'users GET request' });
});

module.exports = router;