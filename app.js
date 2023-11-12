// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Sample game data
const games = [
    { id: 1, name: 'Game 1', description: 'Description of Game 1' },
    { id: 2, name: 'Game 2', description: 'Description of Game 2' },
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
