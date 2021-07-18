const commentHandler = async (event) => {
	event.preventDefault();

	//defines body as value in comment-body input field
	const body = document.querySelector('#comment-body').value;

	//Posts body to comments in database
	const response = await fetch('/api/comments/', {
		method: 'POST',
		body: JSON.stringify({ body }),
		headers: { 'Content-Type': 'application/json' }
	});

	//Redirects to homepage when comment is posted
	if (response.ok) {
		document.location.replace(`/`);
	}
};

document.querySelector('.comment-form').addEventListener('submit', commentHandler);
