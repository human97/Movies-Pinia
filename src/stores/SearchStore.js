import { defineStore } from "pinia";
import { useMovieStore } from "@/stores/MovieStore";
import { ref, computed } from "vue";

const url = "https://api.themoviedb.org/3/search/movie?api_key=02fff4f8ace67a340090878085a075a4&query="; 

export const useSearchStore = defineStore("searchStore", () => {
	const loading = ref(false)
	const searchMovies = ref([])
	const movieStore = useMovieStore()

	const getMovies = async search => {
		loading.value = true
		const response = await fetch(`${url}${search}`)
		const data = await response.json()
		searchMovies.value = data.results
		loading.value = false
	}

    const searchCountMovies = computed(() => searchMovies.value.length);

	const isInFavorites = movie => movieStore.movies.some(m => m.id === movie.id);
	
	const addToFavoriteMovies = object => {	
		let isAlreadyFavorite = isInFavorites(object);
		if (!isAlreadyFavorite) {
			movieStore.movies.push({
				...object,
				isWatched: false,
			})
		}
	}

	return {
		loading,
		searchMovies,
        searchCountMovies,
		isInFavorites,
		getMovies,
		addToFavoriteMovies,
	}
})