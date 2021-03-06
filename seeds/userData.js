const { User } = require('../models');

const userData = [
	{
		name: 'Tim Willis',
		email: 'tw123@gmail.com',
		password: 'password123'
	},
	{
		name: 'Jane Ferrell',
		email: 'jf123@gmail.com',
		password: 'password123'
	},
	{
		name: 'Bob McDonald',
		email: 'bm123@gmail.com',
		password: 'password123'
	},
	{
		name: 'Charles Davis',
		email: 'cd123@gmail.com',
		password: 'password123'
	}
];

const seedUsers = () =>
	User.bulkCreate(userData, {
		individualHooks: true,
		returning: true
	});

module.exports = seedUsers;
