const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					exclude: [ 'password' ],
					attributes: [ 'name' ]
				}
			],
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const posts = postData.map((post) => post.get({ plain: true }));
		res.render('homepage', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/post/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					exclude: [ 'password' ],
					attributes: [ 'name' ]
				},
				{
					model: Comment,
					include: [ { model: User, exclude: [ 'password' ], attributes: [ 'name' ] } ],
					attributes: [ 'body', 'createdAt' ]
				}
			]
		});

		req.session.save(() => {
			req.session.currentPostId = req.params.id;
		});

		const posts = postData.get({ plain: true });

		res.render('post-page', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/userpost/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					exclude: [ 'password' ],
					attributes: [ 'name' ]
				},
				{
					model: Comment,
					include: [ { model: User, exclude: [ 'password' ], attributes: [ 'name' ] } ],
					attributes: [ 'body', 'createdAt' ]
				}
			]
		});

		req.session.save(() => {
			req.session.currentPostId = req.params.id;
		});

		const posts = postData.get({ plain: true });

		res.render('dash-page', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const postData = await Post.findAll({
			where: { userId: req.session.user_id },

			include: [
				{
					model: User,
					exclude: [ 'password' ],
					attributes: [ 'name' ]
				}
			],
			order: [ [ 'updatedAt', 'DESC' ] ]
		});
		const userNameData = await User.findOne({ where: { id: req.session.user_id } });

		const user = userNameData.get({ plain: true });
		const posts = postData.map((post) => post.get({ plain: true }));

		res.render('dashboard', { posts, user, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/login', async (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}
	res.render('login');
});

module.exports = router;
