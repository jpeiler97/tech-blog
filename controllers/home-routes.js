const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		//Gets all posts, includes Username of post's user
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

		//Gets posts from postData, maps into new array with each post being plain objects
		const posts = postData.map((post) => post.get({ plain: true }));

		//Render homepage
		res.render('homepage', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});


router.get('/post/:id', withAuth, async (req, res) => {
	try {
		//Finds post based on id from parameters
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

		//Sets current post Id as req.params.id
		req.session.save(() => {
			req.session.currentPostId = req.params.id;
		});

		//Sets post equal to postData in plain object form.
		const posts = postData.get({ plain: true });

		//Renders post page with post
		res.render('post-page', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/userpost/:id', withAuth, async (req, res) => {
	try {
		//Gets specific post by id, only if it belongs to the currently logged in user.
		const postData = await Post.findByPk(req.params.id, {
			where: { userId: req.session.user_id },
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

		//If the post doesn't belong to the user, redirect to the homepage. Else, set the current post id to req.params.id, and render dash-page with post in plain object form.
		if (postData.userId !== req.session.user_id) {
			res.redirect('/');
		} else {
			req.session.save(() => {
				req.session.currentPostId = req.params.id;
			});

			const posts = postData.get({ plain: true });

			res.render('dash-page', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/dashboard', withAuth, async (req, res) => {
	try {
		//Find all posts that belong to currently logged in user.
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

		//Get name of user by finding User based on current user's id
		const userNameData = await User.findOne({ where: { id: req.session.user_id } });

		//Set user and posts to plain objects.
		const user = userNameData.get({ plain: true });
		const posts = postData.map((post) => post.get({ plain: true }));

		//Render dashboard with user and posts
		res.render('dashboard', { posts, user, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//If user attempts to view login page while logged in, redirect to home. Else, render the login page.
router.get('/login', async (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}
	res.render('login');
});

module.exports = router;
