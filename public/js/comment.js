const commentHandler = async (event) => {
	event.preventDefault();

	const body = document.querySelector('#comment-body').value;

	const response = await fetch('/api/comments/', {
		method: 'POST',
		body: JSON.stringify({ body }),
		headers: { 'Content-Type': 'application/json' }
	});

	if (response.ok) {
		document.location.replace(`/`);
	}
};

document.querySelector('.comment-form').addEventListener('submit', commentHandler);
