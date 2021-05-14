const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const commentData = await Comment.create({
			body: req.body.body,
			userId: req.session.userId,
			postId: req.session.currentPostId
		});

		res.status(200).json(commentData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
