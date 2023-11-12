// public/main.js
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const queryInput = document.getElementById('query');
  const resultsContainer = document.getElementById('results');

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = queryInput.value;

    try {
      const response = await axios.get(`/search?q=${query}`);
      displayResults(response.data);
    } catch (error) {
      console.error('Error searching:', error.message);
    }
  });

  function displayResults(results) {
    resultsContainer.innerHTML = '';
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.textContent = result.title;
      resultsContainer.appendChild(resultItem);
    });
  }
});
