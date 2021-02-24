/** @format */

const mongoose = require('mongoose');
const User = require('../src/user');

before((done) => {
	mongoose.connect('mongodb://localhost/users_test', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	mongoose.connection
		.once('open', () => {
			done();
		})
		.on('error', () => {
			console.warn('Warning: ', error);
		});
});

beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		mongoose.connection.collections.blogposts.drop(() => {
			mongoose.connection.collections.comments.drop(() => done());
		});
	});
});

after(() => {
	process.exit();
});
