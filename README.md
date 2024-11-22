# goodmovies

A Vue 3 web application that displays a list of movies using the TMDB API. Users can view movie details, add movies to their favorites, and manage comments on their favorite movies.

---

## Features

- **Discover Movies**: Browse a list of movies fetched from the TMDB API.
- **View Details**: Click on a movie to view detailed information, including genres, country, language, and a link to its IMDb page.
- **Favorites Management**: Add or remove movies from your favorites list.
- **Comments**: Add comments to your favorite movies. Comments are displayed only if a movie is marked as a favorite.
- **Sort and Search**: Sort favorite movies by title or rating and search by title.
- **Responsive UI**: A clean and user-friendly interface with responsive design.

---

## Technologies used

- **Vue.js 3**: Frontend framework
- **Vue Router**: For navigation between pages
- **TMDB API**: Movie data
- **LocalStorage**: Persistent storage for favorites and comments

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Steps
1. Clone the repository:
```sh
git clone https://github.com/guillegpra/goodmovies.git
cd goodmovies
```

2. Install depencencies:
```sh
npm install
```

3. Run server
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`.
