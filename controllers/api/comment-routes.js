const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/post/:id', async (req, res) => {
	try {
		const commentData = await Comment.create({
			body: req.body.body,
			userId: req.session.userId,
			postId: req.params.id
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
