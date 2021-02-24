/** @format */

const assert = require('assert');
const User = require('../src/user');

describe('Test Update with User', () => {
	let user;
	beforeEach((done) => {
		user = new User({ name: 'Chris', postCount: 0 });
		user.save().then(() => {
			new User({ name: 'Christine' }).save().then(() => done());
		});
	});

	it('model class - update a user via updateOne', (done) => {
		User.updateOne({ _id: user._id }, { name: 'Darren' }).then(() => {
			User.findOne({ name: 'Darren' }).then((user) => {
				assert(user);
				done();
			});
		});
	});

	it('model class - update many users via updateMany', (done) => {
		User.updateMany({}, { name: 'Joe' }).then(() => {
			User.find({ $or: [{ name: 'Chris' }, { name: 'Christine' }] }).then(
				(users) => {
					assert(!users.length);
					done();
				}
			);
		});
	});

	it('model class - update a user via findOneAndUpdate', (done) => {
		User.findOneAndUpdate(
			{ name: 'Christine' },
			{ name: 'Marge' },
			{ useFindAndModify: false }
		).then(() => {
			User.findOne({ name: 'Christine' }).then((user) => {
				assert(user === null);
				done();
			});
		});
	});

	it('model class - update a user via findByIdAndUpdate', (done) => {
		User.findByIdAndUpdate(
			user._id,
			{ name: 'Darren' },
			{ useFindAndModify: false }
		).then(() => {
			User.findById(user._id).then((user) => {
				assert(user.name === 'Darren');
				done();
			});
		});
	});

	/* it('model class - update a user by incrementing its postCount by 1', (done) => {
		User.findOneAndUpdate(
			{ name: 'Chris' },
			{ $inc: { postCount: 1 } },
			{ useFindAndModify: false }
		).then(() => {
			User.findOne({ name: 'Chris' }).then((user) => {
				assert(user.postCount === 1);
				done();
			});
		});
	}); */

	it('Model class - update user by adding a new post', (done) => {
		User.findOneAndUpdate(
			{ name: 'Chris' },
			{ $push: { posts: { title: 'Solid Foundations' } } },
			{ useFindAndModify: false }
		).then((updatedUser) => {
			User.findById({ _id: updatedUser._id }).then((user) => {
				assert(user.posts[0].title === 'Solid Foundations');
				done();
			});
		});
	});

	it('class instance - update user by adding a new post', (done) => {
		User.findOne({ name: 'Chris' }).then((user) => {
			user.posts.push({ title: 'Solid Foundations' });
			user.save().then(() => {
				User.findOne({ _id: user._id }).then((user_ref) => {
					assert(user_ref.posts.length === 1);
					3;
					assert(user_ref.posts[0].title === 'Solid Foundations');
					done();
				});
			});
		});
	});

	it('class instance - update user via set and save', (done) => {
		user
			.set({ name: 'Mark' })
			.save()
			.then(() => {
				User.findOne({ name: 'Mark' }).then((user) => {
					assert(user.name === 'Mark');
					done();
				});
			});
	});
});
