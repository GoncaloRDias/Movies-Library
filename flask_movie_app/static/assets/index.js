const tmd = new TMD_Rest()

function generateCard(id, title, year, genres, poster, rating) {
    return `
        <div class="card" style="background-image: url(${poster}" data-movieId="${id}")">
            <div>
                <h1>${title} (${year.slice(0, 4)})</h1>
                <p>${genres}</p>
                <div>
                    <p>${rating}/10</p>
                </div >
            </div >
        </div >
        `
}

function getCardList(movies) {
    let list = ""
    movies.forEach(movie => {
        let poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`
        if (movie.poster_path == null) {
            poster = '/static/images/movie_placeholder.png';
        }
        list += generateCard(movie.id,
            movie.title,
            movie.release_date,
            movie.genres,
            poster,
            movie.vote_average)
    });

    return list
}

async function cardClickHandler(e) {
    const movieId = e.target.dataset.movieid;
    if (movieId) {
        const movie = await tmd.getMovieDetail(movieId)
        let genres = []
        movie.genres.forEach(genre => genres.push(genre.name))

        const movieInfoContainer = document.getElementById("movie_info_container")
        const movieInfoTitle = document.getElementById("movie_info_title")
        const movieInfoTagline = document.getElementById("movie_info_tagline")
        const movieInfoRuntime = document.getElementById("movie_info_runtime")
        const movieInfoGenre = document.getElementById("movie_info_genre")
        const movieInfoOverview = document.getElementById("movie_info_overview")
        const movieInfoRating = document.getElementById("movie_info_rating")

        movieInfoContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        movieInfoContainer.style.display = 'block'

        movieInfoTitle.innerText = `${movie.title} (${movie.release_date.slice(0, 4)})`
        movieInfoRuntime.innerText = `${movie.runtime} mins`
        if (movie.tagline) {
            movieInfoTagline.innerText = movie.tagline
        }
        movieInfoGenre.innerText = genres
        movieInfoOverview.innerText = movie.overview
        movieInfoRating.innerText = `${movie.vote_average}/10 (${movie.vote_count} votes)`
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchBox = document.querySelector('.searchBox');
    const trendingBtn = document.getElementById('trending_btn');
    const popularBtn = document.getElementById('popular_btn');
    const topRatedBtn = document.getElementById('top_rated_btn');
    const moviesList = document.getElementById('movies_list');
    const subtitle = document.getElementById('subtitle');
    const movieInfoContainer = document.getElementById('movie_info_container');
    const movieInfoClose = document.getElementById('close_info');

    searchBox.addEventListener('input', async function () {
        const query = this.value;
        if (query.length < 3) return;
        subtitle.innerText = `Searching for "${query}"`
        moviesList.innerHTML = "loading..."
        const searchResultMovies = await tmd.searchMovie(query)
        moviesList.innerHTML = ""
        moviesList.innerHTML += getCardList(searchResultMovies)
    });

    trendingBtn.addEventListener('click', async function () {
        subtitle.innerText = `Showing trending movies`
        console.log('Trending button clicked');
        moviesList.innerHTML = "loading..."
        const trendingMovies = await tmd.getTrendingMovies()
        console.log(trendingMovies);
        moviesList.innerHTML = ""
        moviesList.innerHTML += getCardList(trendingMovies)
    });

    popularBtn.addEventListener('click', async function () {
        subtitle.innerText = `Showing popular movies`
        console.log('Popular button clicked');
        moviesList.innerHTML = "loading..."
        const popularMovies = await tmd.getPopularMovies()
        console.log(popularMovies);
        moviesList.innerHTML = ""
        moviesList.innerHTML += getCardList(popularMovies)
    });

    topRatedBtn.addEventListener('click', async function () {
        subtitle.innerText = `Showing top rated movies`
        console.log('Top Rated button clicked');
        moviesList.innerHTML = "loading..."
        const topRatedMovies = await tmd.getTopRatedMovies()
        console.log(topRatedMovies);
        moviesList.innerHTML = ""
        moviesList.innerHTML += getCardList(topRatedMovies)
    });

    movieInfoClose.addEventListener('click', function () {
        movieInfoContainer.style.display = 'none'
    });

    document.body.addEventListener('click', cardClickHandler);

    trendingBtn.click();
});
