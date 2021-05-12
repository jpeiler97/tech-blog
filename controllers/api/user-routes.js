const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const userData = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		console.log(userData);
		req.session.save(() => {
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		if (!userData) {
			res.status(500).json({ message: 'Wrong Email' });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Wrong Password' });
			return;
		}

		req.session.save(() => {
			req.session.userId = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: 'Logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

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
