<template>
    <div>
        <h1>Favorite Movies</h1>

        <div class="filter-options">
            <!-- sort by -->
            <label for="sortOptions">Sort by:</label>
            <select id="sortOptions" v-model="sortOption">
                <option value="default">Default (date added)</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
            </select>

            <!-- search -->    
            <label for="searchInput">Search:</label>
            <input id="searchInput" type="text" v-model="searchQuery" placeholder="Search by title"
            />
        </div>

        <div v-if="favMovies.length" class="movie-grid">
            <div class="movie-card" v-for="movie in filteredFavorites" :key="movie.id">
                <div class="favorite-icon" :class="{ favorited: isFavorited(movie.id) }" @click="toggleFavorite(movie.id)">
                    <span v-if="isFavorited">★</span>
                    <span v-else>☆</span>
                </div>

                <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
                    <img :src="getMoviePoster(movie.poster_path)" :alt="movie.title"/>
                    <h2>{{ movie.title }}</h2>
                    <p>Rating: {{ movie.vote_average }}</p>
                </router-link>

                <div class="comments-section">
                    <p v-if="comments[movie.id]">
                        <strong>Comment:</strong> {{ comments[movie.id] }}
                    </p>
                    <p v-else>
                        <em>No comments yet</em>
                    </p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No favorited movies yet. Go back to the <router-link to="/">homepage</router-link> to add some!</p>
        </div>
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
    data() {
        return {
            favMovies: [],
            localStFavorites: JSON.parse(localStorage.getItem('favorites')) || [],
            comments: JSON.parse(localStorage.getItem('comments')) || {},
            newComments: {}, // Temporarily hold new comments before saving
            sortOption: 'default',
            searchQuery: '',
        };
    },
    computed: {
        // Sort based on the selected sort option
        sortedFavorites() {
            if (this.sortOption === "default") {
                return this.favMovies;
            }

            return this.favMovies.slice().sort((a, b) => {
                if (this.sortOption === "title") {
                    return a.title.localeCompare(b.title); // Alphabetically
                } else if (this.sortOption === "rating") {
                    return b.vote_average - a.vote_average; // Highest rating to lowest)
                }
                return 0;
            });
        },
        // Sort based on the search query
        filteredFavorites() {
            return this.sortedFavorites.filter((movie) =>
                movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    methods: {
        async fetchFavorites() {
            try {
                if (!this.localStFavorites.length) {
                    // not favorites movies in localStorage
                    this.favMovies = [];
                    return;
                }
                
                const promises = this.localStFavorites.map(async (id) => {
                    try {
                        const response = await fetch(`${BASE_URL}/${id}?language=en-US`, options);

                        if (!response.ok) {
                            console.error(`Error fetching movie with ID ${id}. HTTP status: ${response.status}`);
                            throw new Error(`Error fetching movie information: ${response.statusText}`);
                        }

                        const data = await response.json();
                        return data;
                    } catch (error) {
                        console.error(`Error fecthing movie with ID ${id}:`, error);
                        return null;
                    }
                });

                this.favMovies = await Promise.all(promises);
                console.log(this.favMovies);
            } catch (error) {
                console.error("Error fetching favorited movies", error);
            }
        },
        getMoviePoster(path) {
            return `https://image.tmdb.org/t/p/w500${path}`;
        },
        isFavorited(movieId) {
            return this.localStFavorites.includes(movieId.toString());
        },
        toggleFavorite(movieId) {
            if (this.isFavorited(movieId)) {
                // Remove from favorites
                const index = this.localStFavorites.indexOf(movieId.toString());
                if (index !== -1) 
                    this.localStFavorites.splice(index, 1);
                    delete this.comments[movieId];
            } else {
                // Add to favorites
                this.localStFavorites.push(movieId.toString());

                const comment = prompt("Add a comment for this movie (optional):");
                if (comment) {
                    this.comments[movieId] = comment;
                }
            }

            // Update localStorage
            localStorage.setItem('favorites', JSON.stringify(this.localStFavorites));
            localStorage.setItem('comments', JSON.stringify(this.comments));

            // Update the displayed movies
            this.favMovies = this.favMovies.filter(movie => movie.id !== movieId);
        },
    },
    watch: {
        // Re-sort if needed
        sortOption(newValue) {
            console.log("Sorting by:", newValue);
        }
    },
    created() {
        this.fetchFavorites();
    },
};
</script>

<style scoped>
.filter-options {
    margin-bottom: 20px;
}

.comments-section {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: hsla(160, 100%, 37%, 1);;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: rgb(7, 106, 74);
}

#sortOptions,
#searchInput {
    padding: 5px;
    margin: 10px;
}
</style>
