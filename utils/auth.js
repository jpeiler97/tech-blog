
//Function used in controllers that checks if user is logged in before directing them to a route that requires authorization. If not logged in, redirect user to the login page.
const withAuth = (req, res, next) => {
	if (!req.session.logged_in) {
		res.redirect('/login');
	} else {
		next();
	}
};

module.exports = withAuth;
