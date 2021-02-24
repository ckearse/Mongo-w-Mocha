/** @format */

const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
	it('users name is longer than 3 character minimum', (done) => {
		try {
			let user = new User({ name: 'a' });
			const validationResult = user.validateSync();
			const { message } = validationResult.errors.name;
			assert(message === 'Name must include atleast 3 characters or more.');
			done();
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('user name is provided', (done) => {
		try {
			let user = new User({ name: undefined });
			const validationResult = user.validateSync();
			const { message } = validationResult.errors.name;
			assert(message === 'Name is required.');
			done();
		} catch (error) {
			console.error('Error: ', error);
		}
	});
});
