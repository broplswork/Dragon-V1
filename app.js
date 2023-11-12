// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Sample game data
const games = [
    { id: 1, name: 'Game 1', description: 'Description of Game 1', releaseYear: 2020, genre: 'Action' },
    { id: 2, name: 'Game 2', description: 'Description of Game 2', releaseYear: 2019, genre: 'Adventure' },
    // Add more games as needed
];

// Set the views folder and use EJS as the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

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

// Search page
app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const results = games.filter(game => game.name.toLowerCase().includes(query));

    res.render('search', { results, query });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
