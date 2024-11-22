<template>
    <div>
        <h1>Most popular movies</h1>
        <div v-if="loading">Loading...</div>
        <div v-else class="movie-grid">
            <div class="movie-card" v-for="movie in movies" :key="movie.id">
                <div class="favorite-icon" :class="{ favorited: isFavorited(movie.id) }" @click="toggleFavorite(movie.id)">
                    <span v-if="isFavorited">★</span>
                    <span v-else>☆</span>
                </div>

                <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
                    <img :src="getMoviePoster(movie.poster_path)" :alt="movie.title"/>
                    <h2>{{ movie.title }}</h2>
                    <p>Rating: {{ movie.vote_average }}</p>
                </router-link>
            </div>
        </div>
        <button v-if="!loading" @click="loadMore">Load more</button>
    </div>
</template>

<script>
import { getMovies } from '../api'

export default {
    data() {
        return {
            movies: [],
            loading: true,
            page: 1,
            favorites: JSON.parse(localStorage.getItem('favorites')) || [],
            comments: JSON.parse(localStorage.getItem("comments")) || {},
        };
    },
    methods: {
        async fetchMovies() {
            try {
                this.loading = true;
                const data = await getMovies(this.page);
                this.movies = [...this.movies, ...data.results];
            } catch (error) {
                console.error("Error fetching the movies", error);
            } finally {
                this.loading = false;
            }
        },
        getMoviePoster(path) {
            return `https://image.tmdb.org/t/p/w500${path}`;
        },
        loadMore() {
            this.page++;
            this.fetchMovies();
        },
        isFavorited(movieId) {
            return this.favorites.includes(movieId.toString());
        },
        toggleFavorite(movieId) {
            if (this.isFavorited(movieId)) {
                // Remove from favorites
                const index = this.favorites.indexOf(movieId.toString());
                if (index !== -1) {
                    this.favorites.splice(index, 1);
                    delete this.comments[movie.id];
                }
            } else {
                // Add to favorites
                this.favorites.push(movieId.toString());

                const comment = prompt("Add a comment for this movie (optional):");
                if (comment) {
                    this.comments[movieId] = comment; // Add comment to comments object
                }
            }

            // Update localStorage
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            localStorage.setItem('comments', JSON.stringify(this.comments));
        },
    },
    created() {
        this.fetchMovies();
    },
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}

.movie-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.movie-card {
    width: 200px;
    text-align: center;
    position: relative;
}

.movie-card img {
    width: 100%;
    border-radius: 8px;
}

.movie-card h3 {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
}

.favorite-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: hsla(160, 100%, 37%, 1);
    font-size: 20px;
    padding: 5px 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
}

.favorite-icon.favorited {
    background: hsla(160, 100%, 37%, 1);
    color: black;
}
</style>