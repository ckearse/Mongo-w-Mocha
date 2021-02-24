/** @format */

const assert = require('assert');
const User = require('../src/user');

describe('Reading users from DB', () => {
	let user;

	beforeEach((done) => {
		user = new User({ name: 'Chris' });

		user.save().then(() => {
			done();
		});
	});

	it('find all users with the name Chris', (done) => {
		User.find({ name: 'Chris' }).then((users) => {
			assert(user._id.toString() === users[0]._id.toString());
			done();
		});
	});

	it('find a user with a specific id', (done) => {
		User.findOne({ _id: user._id }).then((foundUser) => {
			assert(foundUser.name === 'Chris');
			done();
		});
	});
});
