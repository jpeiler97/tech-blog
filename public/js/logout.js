const logout = async () => {

	//Attempt to logout user
	const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	});

	//If log-out attempt was succesful, redirect to homepage.
	if (response.ok) {
		document.location.replace('/');
	} else {
		alert('Failed to log out.');
	}
};

//Attach logout function to logout button.
document.querySelector('#logout').addEventListener('click', logout);
