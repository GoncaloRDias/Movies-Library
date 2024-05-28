class TMD_Rest {
    // Método assíncrono para obter filmes em tendência.
    async getTrendingMovies() {
        // Define a URL do endpoint da API para filmes em tendência.
        const url = `/api/trending`;
        // Faz a solicitação à API usando fetch.
        const req = await fetch(url);
        // Recolhe os resultados da resposta JSON.
        const { results } = await req.json();
        // Retorna os resultados.
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
