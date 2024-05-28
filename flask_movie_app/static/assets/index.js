// Cria uma nova instância da classe TMD_Rest
const tmd = new TMD_Rest()

// Função para gerar o HTML do "card" dos filmes
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

// Função para gerar uma lista de "cards" a partir de uma lista de filmes
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

// Função assíncrona para mostrar detalhes do filmes ao clicar no mesmo
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

// Evento que aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', async () => {
    // Cria variaveis para obter as referências dos elementos HTML necessários
    const searchBox = document.querySelector('.searchBox');
    const trendingBtn = document.getElementById('trending_btn');
    const popularBtn = document.getElementById('popular_btn');
    const topRatedBtn = document.getElementById('top_rated_btn');
    const moviesList = document.getElementById('movies_list');
    const subtitle = document.getElementById('subtitle');
    const movieInfoContainer = document.getElementById('movie_info_container');
    const movieInfoClose = document.getElementById('close_info');

    // Evento para procurar filmes na search bar
    searchBox.addEventListener('input', async function () {
        const query = this.value;
        if (query.length < 3) return;
        subtitle.innerText = `Searching for "${query}"`
        moviesList.innerHTML = "loading..."
        const searchResultMovies = await tmd.searchMovie(query)
        moviesList.innerHTML = ""
        moviesList.innerHTML += getCardList(searchResultMovies)
    });

    // Evento para quando clicarmos no botão mostrar os filmes das tendencias
    trendingBtn.addEventListener('click', async function () {
        subtitle.innerText = `Showing trending movies`
        console.log('Trending button clicked');
        moviesList.innerHTML = "loading..."
        const trendingMovies = await tmd.getTrendingMovies()
        console.log(trendingMovies);
        moviesList.innerHTML = ""
        moviesList.innerHTML += getCardList(trendingMovies)
    });

    // Evento para quando clicarmos no botão mostrar os filmes populares
    popularBtn.addEventListener('click', async function () {
        subtitle.innerText = `Showing popular movies`
        console.log('Popular button clicked');
        moviesList.innerHTML = "loading..."
        const popularMovies = await tmd.getPopularMovies()
        console.log(popularMovies);
        moviesList.innerHTML = ""
        moviesList.innerHTML += getCardList(popularMovies)
    });

    // Evento para quando clicarmos no botão mostrar os filmes melhor avaliados
    topRatedBtn.addEventListener('click', async function () {
        subtitle.innerText = `Showing top rated movies`
        console.log('Top Rated button clicked');
        moviesList.innerHTML = "loading..."
        const topRatedMovies = await tmd.getTopRatedMovies()
        console.log(topRatedMovies);
        moviesList.innerHTML = ""
        moviesList.innerHTML += getCardList(topRatedMovies)
    });

    // Evento ara quando clicarmos no botão de fechar, fechar detalhes do filme
    movieInfoClose.addEventListener('click', function () {
        movieInfoContainer.style.display = 'none'
    });

    // Evento para quando clicamos no card
    document.body.addEventListener('click', cardClickHandler);

    // Simula um clique no botão de filmes tendências para carregar os filmes das tendências ao carregar a página
    trendingBtn.click();
});
