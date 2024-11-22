
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWZiOWU0MzEwZTU3MmQ0NTY0Y2NjMjU1ZDI2NzMyMiIsInN1YiI6IjY1NTM1MjM1ZDRmZTA0MDEzOTgxMjVmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CEYYvydoCUUJgTR7eskapz3sGiU-Y8gjzE9nmJMXOdE';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

export const getMovies = async (page = 1) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        }
    };
    const url = `${BASE_URL}?language=en-US&sort_by=popularity.desc&page=${page}`;

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error fetching movies: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching the movies', error);
        throw error;
    }
};