/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
	title: {
		type: String,
		required: [true, 'BlogPost requires a name.'],
	},
	content: {
		type: String,
		required: [true, 'BlogPost requires some content.'],
		validate: {
			validator: (content) => {
				return content.length > 3;
			},
			message: 'BlogPost content must include 3 or more characters.',
		},
	},

	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user',
	},
	comments: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'comment',
		},
	],
});

const BlogPost = mongoose.model('blogpost', BlogPostSchema);

module.exports = BlogPost;
