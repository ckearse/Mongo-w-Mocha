/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user',
	},
	content: {
		type: String,
		required: [true, 'Comment must have some text content.'],
		validate: {
			validator: (content) => {
				return content.length > 3;
			},
			message: 'Comment must contain 3 or more characters',
		},
	},
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
