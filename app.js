// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 3000;

// Configuration
const games = [
    { id: 1, name: 'Guessing Game', description: 'Try to guess the correct number between 1 and 10' },
    { id: 2, name: 'Roblox', description: 'Play Roblox', link: '/games/roblox/play' },
    // Add more games as needed
];

const proxyUrlMap = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    // Add more search engines and their proxy URLs as needed
};

// Middleware for checking ad-blockers
const adBlockerMiddleware = (req, res, next) => {
    const isAdBlocked = req.query.adblock === 'true';
    res.locals.isAdBlocked = isAdBlocked;
    next();
};

// Set up views and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(adBlockerMiddleware);

// Home page
app.get('/', (req, res) => {
    res.render('index', { games });
});

// Individual game page
app.get('/games/:id', (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = games.find(g => g.id === gameId);

    if (game) {
        res.render('game', { game });
    } else {
        res.status(404).send('Game not found');
    }
});

// Proxy route for search
app.get('/search', (req, res) => {
    const query = req.query.q;
    const searchEngine = req.query.engine;

    if (!query || !searchEngine || !proxyUrlMap[searchEngine]) {
        res.render('search', { results: null });
        return;
    }

    const proxyUrl = proxyUrlMap[searchEngine] + encodeURIComponent(query);
    res.render('search', { results: proxyUrl });
});

// Proxy route for Roblox
app.use('/games/roblox/play', proxy('https://now.gg/es/apps/roblox-corporation/5349/roblox.html'));

// Guessing form submission
app.post('/games/:id/guess', (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = games.find(g => g.id === gameId);

    if (game) {
        const secretNumber = Math.floor(Math.random() * 10) + 1;
        const userGuess = parseInt(req.body.userGuess);

        if (userGuess === secretNumber) {
            res.send(`Congratulations! You guessed the correct number (${secretNumber}) in ${req.body.userGuess} tries.`);
        } else {
            res.send(`Sorry, the correct number was ${secretNumber}. Try again!`);
        }
    } else {
        res.status(404).send('Game not found');
    }
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
