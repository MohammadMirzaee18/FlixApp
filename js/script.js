const global = {
  currentPage: window.location.pathname,
};
const displayPopularMovies = async () => {
  const { results } = await getData(
    "movie/popular",
    "1&sort_by=vote_average.desc&vote_count.gte=200"
  );

  const moviesContainer = document.querySelector("#popular-movies");
  results.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("card");
    movieCard.innerHTML = `
       ${
         movie.poster_path
           ? `  <a href="movie-details.html?id=${movie.id}">
            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />
          </a>`
           : `
           <a href="movie-details.html?id=${movie.id}">
             <img
               src="images/no-image.jpg"
               class="card-img-top"
               alt="${movie.title}"
             />
           </a>
         `
       }
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>`;
    moviesContainer.appendChild(movieCard);
  });
};
const displayPopularShows = async () => {
  const { results } = await getData("trending/tv/week", "1");

  const showsContainer = document.querySelector("#popular-shows");
  results.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.classList.add("card");

    showCard.innerHTML = `
       ${
         show.poster_path
           ? `  <a href="tv-details.html?id=${show.id}">
            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />
          </a>`
           : `
           <a href="movie-details.html?id=${show.id}">
             <img
               src="images/no-image.jpg"
               class="card-img-top"
               alt="${show.name}"
             />
           </a>
         `
       }
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date:${show.first_air_date}</small>
            </p>
          </div>`;
    showsContainer.appendChild(showCard);
  });
};
const getData = async (endpoint, page) => {
  const API_url = "https://api.themoviedb.org/3/";
  //NOT secure But for MiniProject purpose only(free API anyway!!)
  const apiKey = "e16c7f4bbf884d197ed13cd9d83d0155";
  showSpinner();
  const res = await fetch(
    `${API_url}${endpoint}?api_key=${apiKey}&language=en-US&page=${page}`
  );
  const data = await res.json();
  hideSpinner();
  return data;
};
function showSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner.classList.add("show");
}
function hideSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("show");
}
function activeLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();

      break;
    case "/movie-details.html":
      console.log("movie");

      break;

    case "/search.html":
      console.log("search");

      break;
    case "/shows.html":
      displayPopularShows();

      break;
    case "/tv-details.html":
      console.log("tv");

      break;

    default:
      break;
  }
  activeLink();
}
document.addEventListener("DOMContentLoaded", init);
