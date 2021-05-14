const commentHandler = async (event) => {
	const body = document.querySelector('#comment-body').value;

	console.log(body);
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
