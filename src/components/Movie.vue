<script setup>
import { useMovieStore } from '@/stores/MovieStore';
import AppButton from '@/components/UI/AppButton.vue';
import { useSearchStore } from '@/stores/SearchStore';

const props = defineProps({
    movie: {
        type: Object,
        required: true,
        default: () => {}
    },
    isSearch: {
        type: Boolean,
        required: false,
        default: false,
    }
});    

const movieStore = useMovieStore();
const searchStore = useSearchStore();
</script>

<template>
    <div class="movie">
        <img 
            :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`" 
            :alt="movie.original_title" 
            class="movie-img" 
        />
        <div>
            <div class="movie-name">
                {{ movie.original_title }} ({{ movie.release_date }})
            </div>
            <span class="movie-overview">
                {{ movie.overview }}
            </span>
            <div 
                v-if="!isSearch" 
                class="wrapper-buttons"
              >
                <AppButton
                    :label="!movie.isWatched ? 'Watched' : 'Unwatched'"
                    :color="!movie.isWatched ? 'success' : 'warning'"
                    @click="movieStore.changeWatchedStatus(movie.id)"
                />
                <AppButton
                    label="Delete"
                    color="danger"
                    @click="movieStore.deleteMovie(movie.id)"
                />
            </div>
            <div 
                v-else 
                class="wrapper-buttons"
              >
                <AppButton
                    :label="searchStore.isInFavorites(movie) ? 'Remove from favorites' : 'Add to favorites'"
                    :color="searchStore.isInFavorites(movie) ? 'danger' : 'success'"
                    :disabled="false"
                    @click="searchStore.isInFavorites(movie) ? movieStore.deleteMovie(movie.id) : searchStore.addToFavoriteMovies(movie)"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.movie {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 30px;
  margin-bottom: 20px;
  border: 2px solid #efefef;
  padding: 10px;
  border-radius: 10px;

  &-accept {
    margin-right: 10px;
  }
  &-img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
  }
  &-name {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  &-overview {
    display: block;
    margin-bottom: 20px;
  }
}

.wrapper-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
}   
</style>