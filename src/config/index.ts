export default {
	PORT: process.env.PORT || 5000,
	DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/shoppingify',
	JWT_SECRET: process.env.JWT_SECRET || 'somesecret',
	CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};
