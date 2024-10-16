document.addEventListener('DOMContentLoaded', function () {
  fetchMovies(); // Fetch random movies when the page loads
});

// Function to fetch random movies from OMDb API
function fetchMovies() {
  const apiKey = '47084143'; // Your OMDb API key
  const MoviesGrid = document.getElementById('MoviesGrid');
  MoviesGrid.innerHTML = '<p>Loading movies...</p>';

  const randomSearchTerms = ['action', 'comedy', 'drama', 'adventure'];
  const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];

  // Fetch movie data from OMDb API with a random search term
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${randomTerm}`)
      .then(response => {
          console.log('Response from OMDb API:', response); // Debugging statement
          return response.json();
      })
      .then(data => {
          console.log('Data fetched:', data); // Debugging statement
          if (data.Search && data.Search.length > 0) {
              moviesToShow(data.Search);
          } else {
              MoviesGrid.innerHTML = '<p>No random movies found!</p>';
          }
      })
      .catch(error => {
          console.error('Error fetching random movies:', error);
          MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
      });
}

// Function to search for movies
function searchMovies() {
  const apiKey = '47084143'; // Your OMDb API key
  const searchInput = document.getElementById('searchInput').value.trim();
  const MoviesGrid = document.getElementById('MoviesGrid');

  // Search result validation
  if (searchInput !== '') {
      MoviesGrid.innerHTML = '<p>Loading movies...</p>';

      // Fetch movie data from OMDb API
      fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchInput)}`)
          .then(response => {
              console.log('Search response from OMDb API:', response); // Debugging statement
              return response.json();
          })
          .then(data => {
              console.log('Search data fetched:', data); // Debugging statement
              if (data.Search && data.Search.length > 0) {
                  moviesToShow(data.Search);
              } else {
                  MoviesGrid.innerHTML = '<p>No movies found with the given name!</p>';
              }
          })
          .catch(error => {
              console.error('Error fetching search data:', error);
              MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
          });
  } else {
      alert('Enter a movie title then search!');
  }
}

// Function to display movies in the grid
function moviesToShow(movies) {
  const MoviesGrid = document.getElementById('MoviesGrid');
  MoviesGrid.innerHTML = ''; // Clear previous results

  movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      movieCard.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h2>${movie.Title}</h2>
          <p>${movie.Year}</p>
      `;

      MoviesGrid.appendChild(movieCard);
  });
}
