const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
	try {
		//Create comment based on body, userId, and postId
		const commentData = await Comment.create({
			body: req.body.body,
			userId: req.session.user_id,
			postId: req.session.currentPostId
		});

		res.status(200).json(commentData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
