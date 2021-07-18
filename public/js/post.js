const postHandler = async (event) => {
	event.preventDefault();

	//Set title and body equal to input values.
	const title = document.querySelector('#post-title').value;
	const body = document.querySelector('#post-body').value;

	//Post title and body to api/posts
	const response = await fetch('/api/posts/', {
		method: 'POST',
		body: JSON.stringify({ title, body }),
		headers: { 'Content-Type': 'application/json' }
	});

	//Redirect to dashboard after posting.
	if (response.ok) {
		document.location.replace('/dashboard');
	}
};

//Attach post function to the post button.
document.querySelector('.post-form').addEventListener('submit', postHandler);
