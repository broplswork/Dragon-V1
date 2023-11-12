// src/app.js
document.addEventListener("DOMContentLoaded", function () {
    // Fetch games from JSON file
    fetch('/src/games.json')
        .then(response => response.json())
        .then(games => {
            const gamesList = document.getElementById('games-list');
            games.forEach(game => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="#" data-id="${game.id}" class="game-link">${game.name}</a>`;
                gamesList.appendChild(listItem);
            });

            // Add event listener for game links
            const gameLinks = document.querySelectorAll('.game-link');
            gameLinks.forEach(link => {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    const gameId = this.getAttribute('data-id');
                    const selectedGame = games.find(game => game.id == gameId);
                    if (selectedGame) {
                        alert(`Selected game: ${selectedGame.name}\nDescription: ${selectedGame.description}`);
                    }
                });
            });
        });

    // Add event listener for search form
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const query = document.getElementById('searchQuery').value;
        const searchEngine = document.getElementById('searchEngine').value;
        if (query && searchEngine) {
            const searchUrl = `https://www.${searchEngine}.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    });
});
