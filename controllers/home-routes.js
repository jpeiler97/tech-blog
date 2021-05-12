const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll();

		const posts = postData.map((post) => post.get({ plain: true }));
		res.render('homepage', { posts });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/login', async (req, res) => {
	try {
		res.render('login');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/dashboard', async (req, res) => {
	try {
		res.render('dashboard');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
