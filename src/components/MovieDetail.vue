<template>
    <div v-if="movie">
        <h1>{{  movie.title  }}</h1>
        <div class="movie-container">
            <div class="favorite-icon" :class="{ favorited: isFavorited }" @click="toggleFavorite">
                <span v-if="isFavorited">★</span>
                <span v-else>☆</span>
            </div>
            <img :src="getMoviePoster(movie.poster_path)" :alt="movie.title"/>
        </div>
        <p><b>Release Date:</b> {{ movie.release_date }}</p>
        <p><b>Rating:</b> {{ movie.vote_average }}</p>
        <p><b>Overview:</b> {{ movie.overview }}</p>
        <p><b>Genres:</b> {{ getGenres() }}</p>
        <p><b>Country:</b> {{ getCountries() }}</p>
        <p><b>Language:</b> {{ getLanguages() }}</p>
        <p>
            <b>IMDb:</b>
            <a :href="getImdbLink()" target="_blank">View on IMDb</a>
        </p>
        <router-link to="/">Back</router-link>
    </div>
</template>

<script>
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWZiOWU0MzEwZTU3MmQ0NTY0Y2NjMjU1ZDI2NzMyMiIsInN1YiI6IjY1NTM1MjM1ZDRmZTA0MDEzOTgxMjVmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CEYYvydoCUUJgTR7eskapz3sGiU-Y8gjzE9nmJMXOdE';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    } 
};

export default {
    props: ['id'],
    data() {
        return {
            movie: null,
            isFavorited: false,
            comments: JSON.parse(localStorage.getItem("comments")) || {},
        };
    },
    methods: {
        async fetchMovie() {
            try {
                const response = await fetch(`${BASE_URL}/${this.id}?language=en-US`, options);
                if (!response.ok) {
                    throw new Error(`Error fetching movie information: ${response.statusText}`);
                }

                this.movie = await response.json();
                this.checkFavoriteStatus();
            } catch (error) {
                console.error('Error fetching the movie information', error);
            }
        },
        getMoviePoster(path) {
            return `https://image.tmdb.org/t/p/w500${path}`;
        },
        getGenres() {
            return this.movie.genres.map(genre => genre.name).join(", ");
        },
        getCountries() {
            return this.movie.production_countries.map(country => country.name).join(", ");
        },
        getLanguages() {
            return this.movie.spoken_languages.map(language => language.english_name).join(", ");
        },
        getImdbLink() {
            return `https://www.imdb.com/title/${this.movie.imdb_id}/`;
        },
        checkFavoriteStatus() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            this.isFavorited = favorites.includes(this.id);
        },
        toggleFavorite() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if (this.isFavorited) {
                // Remove from favorites
                const index = favorites.indexOf(this.id);
                if (index !== -1) 
                    favorites.splice(index, 1);
                    delete this.comments[this.id];
            } else {
                // Add to favorites
                favorites.push(this.id);

                const comment = prompt("Add a comment for this movie (optional):");
                if (comment) {
                    this.comments[this.id] = comment;
                }
            }

            // Update localStorage and state
            localStorage.setItem('favorites', JSON.stringify(favorites));
            localStorage.setItem('comments', JSON.stringify(this.comments));
            this.isFavorited = !this.isFavorited;
        },
    },
    created() {
        this.fetchMovie();
    },
};
</script>

<style>
img {
    max-width: 100%;
    border-radius: 8px;
}

.movie-container {
    position: relative;
    display: inline-block;
}

.favorite-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: hsla(160, 100%, 37%, 1);
    font-size: 24px;
    padding: 5px 10px;
    border-radius: 100%;
    cursor: pointer;
    z-index: 1;
}

.favorite-icon.favorited {
    background: hsla(160, 100%, 37%, 1);
    color: black;
}
</style>
