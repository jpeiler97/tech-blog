const { Post } = require('../models');

const postData = [
	{
		title: 'Just discovered this blog',
		body:
			'Wow! Glad to have found a place where I can post updates about my learnings in the tech field. Very interesting. Anyone else here like mySQL',
		userId: 1
	},
	{
		title: 'Thoughts on JavaScript',
		body:
			'I prefer JavaScript over most programming languages. It is, after all, the backbone of what we see in browsers.',
		userId: 3
	},
	{
		title: 'How to successfully be a tech geek',
		body:
			'Make sure you surround yourself with computer monitors. Carry a lot of books about front-end development. Make friends with other people in the field.',
		userId: 4
	}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
