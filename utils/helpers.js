const router = require('express').Router();

//Handlebars helpers that format the time and date of a post.
module.exports = {
	format_date: (date) => {
		return date.toLocaleDateString();
	},
	format_time: (date) => {
		return date.toLocaleTimeString();
	}
};
