const router = require('express').Router();
const { User } = require('../../models');


//Sign up
router.post('/', async (req, res) => {
	try {
		//Create user based on name, email and password.
		const userData = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		//Upon signup, in session set logged_in to true and user_id to current user's id.
		req.session.save(() => {
			req.session.logged_in = true;
			req.session.user_id = userData.id;
			res.status(200).json(userData);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//Login
router.post('/login', async (req, res) => {
	try {
		//Find user based on email
		const userData = await User.findOne({ where: { email: req.body.email } });

		//Throw error if email doesn't match any users.
		if (!userData) {
			res.status(500).json({ message: 'Wrong Email' });
			return;
		}

		//Checks password using bcrypt using checkPassword function in User model
		const validPassword = await userData.checkPassword(req.body.password);

		//Throw error if password is incorrect
		if (!validPassword) {
			res.status(400).json({ message: 'Wrong Password' });
			return;
		}

		//Upon login, set logged_in to true and user_id as current user id
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: 'Logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

//Logout
router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
