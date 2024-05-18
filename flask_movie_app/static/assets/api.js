class TMD_Rest {
    async getTrendingMovies() {
        const url = `/api/trending`;
        const req = await fetch(url);
        const { results } = await req.json();
        return results;
    }

    async getPopularMovies() {
        const url = `/api/popular`;
        const req = await fetch(url);
        const { results } = await req.json();
        return results;
    }

    async getTopRatedMovies() {
        const url = `/api/top_rated`;
        const req = await fetch(url);
        const { results } = await req.json();
        return results;
    }

    async searchMovie(query) {
        const url = `/api/search/${query}`;
        const req = await fetch(url);
        const { results } = await req.json();
        return results;
    }

    async getMovieDetail(id) {
        const url = `/api/movie/${id}`;
        const req = await fetch(url);
        const res = await req.json();
        return res;
    }
}
