const loginFormHandler = async (event) => {
	event.preventDefault();
	
	//Sets email and passwrod to values in fields
	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	//If email and password values are both given, attempt to post login info to api/users/login
	if (email && password) {
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		//If login is successful, redirect to homepage. Else, alert that the log-in failed.
		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to log in.');
		}
	}
};

const signupFormHandler = async (event) => {
	event.preventDefault();

	//Set name, email, password equal to input values
	const name = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	//If name, email, and password are provided, attempt to post new user to api/users
	if (name && email && password) {
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		//If sign-up was successful, redirect to homepage. Else, alert the user that the sign-up failed.
		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to sign up.');
		}
	}
};


//Attaching login and signup handlers to respective buttons
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
