const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Note = require('../models/note');

// get all notes data
router.get('/', (req, res, next) => {
	Note.find()
	.select('_id title note pinned archived theme created updated')
	.exec()
	.then(response => {
		res.status(200).json({
			code: 200,
			message: "Fetched all records",
			__length: response.length,
			__fetched: new Date(),
			notes: response
		});
	}).catch(err => {
		res.status(404).json({ error: err.message })
	})
});

// add note
router.post('/', (req, res, next) => {
	const note = new Note({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		note: req.body.note,
		pinned: req.body.pinned,
		archived: false,
		theme: req.body.theme
	});
	note.save()
	.then(response => {
		res.status(200).json({
			code: 200,
			message: "Added '" + response.title + "' successfully",
			__fetched: new Date(),
			note: response
		})
	}).catch(err => {
		res.status(404).json({
			status: 404,
			error: err.message
		})
	});
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Note.findById(id)
	.exec()
	.then(response => {
		res.status(200).json({
			code: 200,
			message: "Fetched '" + (response.title || id) + "' successfully",
			__fetched: new Date(),
			note: response
		});
	})
	.catch(err => {
		res.status(404).json({ error: err });
	});
});

// update note data { title & note } fields only (default)
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	if(!req.body.title || !req.body.note){
		return res.status(400).json({
			code: 400,
			message: "'title' and 'note' fields are required",
			__fetched: new Date()
		})
	}
	Note.update(
		{ _id: id },
		{ $set: { title: req.body.title, note: req.body.note, updated: new Date() } }
	).exec()
	.then(response => {
		res.status(200).json({
			code: 200,
			message: "Updated note with id:'" + id + "' successfully",
			__fetched: new Date(),
			noteID: id
		});
	})
	.catch(err => {
		res.status(404).json({ error: err });
	});
});

// archive/remove from archive
router.patch('/archive/:id/:condition', (req, res, next) => {
	const id = req.params.id;
	const acceptParams = ['add', 'remove'];
	const indx = acceptParams.indexOf(req.params.condition);
	if(indx < 0) {
		return res.status(400).json({
			code: 400,
			message: "Invalid url usage",
			__fetched: new Date()
		});
	}
	const condition = (req.params.condition === 'add');
	const msg = (req.params.condition === 'add') ? "Archived note with id:'" + id + "' successfully" : "Note with id:'" + id + "' removed from archive list";
	Note.update({ _id: id }, { $set: { archived: condition, updated: new Date() } })
	.exec()
	.then(response => {
		res.status(200).json({
			code: 200,
			message: msg,
			__fetched: new Date(),
			noteID: id
		});
	})
	.catch(err => {
		res.status(404).json({ error: err.message });
	});
});

// pin/remove from pin
router.patch('/pin/:id/:condition', (req, res, next) => {
	const id = req.params.id;
	const acceptParams = ['add', 'remove'];
	const indx = acceptParams.indexOf(req.params.condition);
	if(indx < 0) {
		return res.status(400).json({
			code: 400,
			message: "Invalid url usage",
			__fetched: new Date()
		});
	}
	const condition = (req.params.condition === 'add');
	const msg = (req.params.condition === 'add') ? "Pinned note with id:'" + id + "' successfully" : "Note with id:'" + id + "' removed from pinned list";
	Note.update({ _id: id }, { $set: { pinned: condition, updated: new Date() } })
	.exec()
	.then(response => {
		res.status(200).json({
			code: 200,
			message: msg,
			__fetched: new Date(),
			noteID: id
		});
	})
	.catch(err => {
		res.status(404).json({ error: err.message });
	});
});

// handle note theme
router.patch('/:id/add-theme', (req, res, next) => {
	const id = req.params.id;
	Note.update({ _id: id }, { $set: { theme: req.body.theme, updated: new Date() } })
	.exec()
	.then(response => {
		res.status(200).json({
			code: 200,
			message: "Changed theme for note with id:'" + id + "'",
			__fetched: new Date(),
			noteID: id,
			theme: req.body.theme
		});
	})
	.catch(err => {
		res.status(404).json({ error: err.message });
	});
});

// Delete note
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Note.remove({ _id: id })
	.exec()
	.then(response => {
		res.status(200).json({
			code: 200,
			__fetched: new Date(),
			messsage: "Note with id:'" + id + "' deleted successfully"
		});
	})
	.catch(err => {
		res.status(404).json({ error: err });
	});
});

// return notes md
module.exports = router;