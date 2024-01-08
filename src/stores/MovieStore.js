import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

// const url = "https://api.themoviedb.org/3/movie/157336?api_key=02fff4f8ace67a340090878085a075a4";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref([]);

  const moviesInLocalStorage = localStorage.getItem("movies");
  if(moviesInLocalStorage) {
    movies.value = JSON.parse(moviesInLocalStorage)._value;
  };

  const watchedMovies = computed(() => movies.value.filter(movie => movie.isWatched));

  const changeWatchedStatus = (id) => {
    const movie = movies.value.find((movie) => movie.id === id);
    movie.isWatched = !movie.isWatched;
  };

  const deleteMovie = (id) => {
    movies.value = movies.value.filter((movie) => movie.id !== id);
  };

  watch(() => movies, (state) => {
    localStorage.setItem("movies", JSON.stringify(state));
  }, {deep: true});

  return {
    movies,
    watchedMovies,
    changeWatchedStatus,
    deleteMovie
  };
})