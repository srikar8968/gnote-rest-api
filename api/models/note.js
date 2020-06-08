const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: {
		type: String,
		required: true
	},
	note: {
		type: String,
		required: true
	},
	pinned: {
		type: Boolean,
		default: false
	},
	archived: {
		type: Boolean,
		default: false
	},
	theme: {
		type: String,
		default: 'transparent'
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Note', noteSchema);