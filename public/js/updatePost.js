const updateHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#update-title').value;
	const body = document.querySelector('#update-body').value;

	const response = await fetch('/api/posts/', {
		method: 'PUT',
		body: JSON.stringify({ title, body }),
		headers: { 'Content-Type': 'application/json' }
	});

	if (response.ok) {
		document.location.replace(`/dashboard`);
	}
};

document.querySelector('.update-form').addEventListener('submit', updateHandler);
