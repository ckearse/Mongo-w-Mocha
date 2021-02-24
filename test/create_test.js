/** @format */
const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
	it('saves a user', (done) => {
		const user = new User({ name: 'Chris' });

		user.save().then(() => {
			assert(!user.isNew);
			done();
		});
	});

	it('save a user with a post', (done) => {
		const user = new User({
			name: 'Christopher',
			posts: [
				{
					title: 'Seeding Hope',
				},
			],
			postCount: 1,
		});

		user.save().then(() => {
			User.findOne({ name: 'Christopher' }).then((user) => {
				assert(user.posts.length === 1);
				assert(user.posts[0].title === 'Seeding Hope');
				done();
			});
		});
	});
});
