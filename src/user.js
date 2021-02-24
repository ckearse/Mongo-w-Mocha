/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
	},
});

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => {
				return name.length > 2;
			},
			message: 'Name must include atleast 3 characters or more.',
		},
		required: [true, 'Name is required.'],
	},
	posts: [PostSchema],
	blogPosts: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'blogpost',
		},
	],
});

UserSchema.virtual('postCount').get(function () {
	return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
