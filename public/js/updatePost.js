const updateHandler = async (event) => {
	event.preventDefault();

	//Set title and body equal to input values
	const title = document.querySelector('#update-title').value;
	const body = document.querySelector('#update-body').value;

	//Attempt to update post with title and body.
	const response = await fetch('/api/posts/', {
		method: 'PUT',
		body: JSON.stringify({ title, body }),
		headers: { 'Content-Type': 'application/json' }
	});


	//Redirect to dashboard after update.
	if (response.ok) {
		document.location.replace(`/dashboard`);
	}
};


//Attach update function to update button
document.querySelector('.update-form').addEventListener('submit', updateHandler);
