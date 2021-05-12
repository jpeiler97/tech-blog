const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: [ 'name' ]
				}
			]
		});

		const posts = postData.map((post) => post.get({ plain: true }));
		res.render('homepage', { posts });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: [ 'name' ]
				},
				{
					model: Comment,
					include: [ { model: User, attributes: [ 'name' ] } ],
					attributes: [ 'body', 'createdAt' ]
				}
			]
		});

		const posts = postData.get({ plain: true });
		res.render('post-page', posts);
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
