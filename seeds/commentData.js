const { Comment } = require('../models');

const commentData = [
	{
		body: 'Yeah, I think this site is really nifty.',
		userId: 2,
		postId: 1
	},
	{
		body: "Haha, it's not hard to be a tech geek!",
		userId: 3,
		postId: 3
	}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
