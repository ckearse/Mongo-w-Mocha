/** @format */

const mongoose = require('mongoose');
const User = require('./../src/user');
const BlogPost = require('./../src/blogPosts');
const Comment = require('./../src/comment');
const assert = require('assert');

describe('Verify relational associations', () => {
	beforeEach((done) => {
		new User({ name: 'Chris' }).save().then(() => {
			new User({ name: 'Jess' }).save().then(() => {
				done();
			});
		});
	});

	it('test adding a blogpost to a user', (done) => {
		try {
			User.findOne({ name: 'Chris' }).then((user) => {
				const blogPost = new BlogPost({
					title: 'To Babe',
					content: 'You are my sunshine ^_^',
					user: user,
				});

				blogPost.save().then(() => {
					user.blogPosts.push(blogPost);
					user.save().then(() => {
						assert(user.blogPosts.length === 1);
						BlogPost.findById({ _id: blogPost._id }).then((post) => {
							assert(post.content === 'You are my sunshine ^_^');
							done();
						});
					});
				});
			});
		} catch (error) {
			console.error('Error: ', error);
		}
	});

	it('test adding a comment to a blogpost', (done) => {
		User.findOne({ name: 'Chris' }).then((user) => {
			const blogPost = new BlogPost({
				title: 'To Babe',
				content: 'You are my sunshine ^_^',
				user: user,
			});

			blogPost.save().then(() => {
				user.blogPosts.push(blogPost);
				user.save().then(() => {
					User.findOne({ name: 'Jess' }).then((jess) => {
						let comment = new Comment({
							user: jess,
							content: 'My only sunshinnnnne!',
						});
						comment.save().then(() => {
							blogPost.comments.push(comment);
							blogPost.save().then(() => {
								BlogPost.findById({ _id: blogPost._id }).then((post) => {
									assert(blogPost.comments.length === 1);
									Comment.findById({ _id: post.comments[0]._id }).then(
										(comment) => {
											assert(comment.content === 'My only sunshinnnnne!');
											assert(String(comment.user) === String(jess._id));
											done();
										}
									);
								});
							});
						});
					});
				});
			});
		});
	});
});
