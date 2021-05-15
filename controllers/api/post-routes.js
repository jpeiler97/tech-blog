const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const postData = await Post.create({
			title: req.body.title,
			body: req.body.body,
			userId: req.session.user_id
		});

		res.status(200).json(postData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.put('/', async (req, res) => {
	try {
		const postData = await Post.update(req.body, {
			where: {
				id: req.session.currentPostId
			}
		});

		if (!postData[0]) {
			res.status(404).json({ message: 'No post found with this ID' });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/', async (req, res) => {
	try {
		const postData = await Post.destroy({
			where: {
				id: req.session.currentPostId
			}
		});

		if (!postData) {
			res.status(404).json({ message: 'No post found with this id!' });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
