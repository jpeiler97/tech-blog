const deleteHandler = async (event) => {
	event.preventDefault();

	const response = await fetch('/api/posts/', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	}
};

document.querySelector('.delete-post-button').addEventListener('click', deleteHandler);
