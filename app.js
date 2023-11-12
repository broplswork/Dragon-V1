// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configuration
const games = [
    { id: 1, name: 'Guessing Game', description: 'Try to guess the correct number between 1 and 10' },
    { id: 2, name: 'Roblox', description: 'Play Roblox', link: '/games/roblox/play' },
    // Add more games as needed
];

// Middleware for checking ad-blockers
const adBlockerMiddleware = (req, res, next) => {
    const isAdBlocked = req.query.adblock === 'true';
    res.locals.isAdBlocked = isAdBlocked;
    next();
};

// Set up views and static files
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(adBlockerMiddleware);

// Home page
app.get('/', (req, res) => {
    res.render('index.html');
});

// Proxy route for Roblox
app.use('/games/roblox/play', (req, res) => {
    res.redirect('https://now.gg/es/apps/roblox-corporation/5349/roblox.html');
});

// Error handling for 404
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
