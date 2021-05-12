const router = require('express').Router();
const { User } = require('../../models');

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
