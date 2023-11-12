// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 3000;

// Sample game data
const games = [
    { id: 1, name: 'Guessing Game', description: 'Try to guess the correct number between 1 and 10' },
    { id: 2, name: 'Roblox', description: 'Play Roblox', link: '/games/roblox/play' },
    // Add more games as needed
];

// Set the views folder and use EJS as the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

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

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
