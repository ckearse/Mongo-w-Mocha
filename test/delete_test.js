/** @format */

const assert = require('assert');
const User = require('../src/user');

describe('Deleting a record', () => {
	let user;

	beforeEach((done) => {
		user = new User({ name: 'Chris' });
		user.save().then(() => {
			done();
		});
	});

	it('class method - delete all users with name of Chris', (done) => {
		User.deleteMany({ name: 'Chris' })
			.then(() => {
				User.find({ name: 'Chris' });
			})
			.then((users) => {
				assert(users === undefined);
				done();
			});
	});

	it('class method - delete a user matching user._id', (done) => {
		User.deleteOne({ _id: user._id })
			.then(() => {
				User.findOne({ _id: user._id });
			})
			.then((user) => {
				assert(user === undefined);
				done();
			});
	});

	it('model instance - delete a user matching user._id', (done) => {
		user
			.delete()
			.then(() => {
				User.findOne({ _id: user._id });
			})
			.then((user) => {
				assert(user === undefined);
				done();
			});
	});

	it('model instance - delete a post from a user', (done) => {
		try {
			user.posts.push({ title: 'New Horizons' });
			user
				.save()
				.then(() =>
					User.findById({ _id: user._id }).then((user) => {
						assert(user.posts.length === 1);
						user.posts[0].remove();
						return user.save();
					})
				)
				.then(() =>
					User.findById({ _id: user._id }).then((user) => {
						assert(user.posts.length === 0);
						done();
					})
				);
		} catch (error) {
			console.error('Error: ', error);
		}
	});
});
