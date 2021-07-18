const deleteHandler = (event) => {
	event.preventDefault();

	//Deletes post
	const response = fetch('/api/posts/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	});

	//Redirects to dashboard after post deletion
	if (response.ok) {
		document.location.replace('/dashboard');
	}
};

document.querySelector('.delete-post-button').addEventListener('click', deleteHandler);
