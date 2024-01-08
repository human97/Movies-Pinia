<script setup>
import { ref } from 'vue';
import { useSearchStore } from '@/stores/SearchStore';
import Loader from '@/components/Loader.vue';
import Movie from '@/components/Movie.vue';


const searchStore = useSearchStore();
const searchMovie = ref('')
</script>

<template>
    <form @submit.prevent="searchStore.getMovies(searchMovie)">
        <input 
            type="text"
            class="search-input"
            placeholder="Input movie name"
            v-model="searchMovie"
        >
    </form>

    <Loader v-if="searchStore.loading"/>

    <div v-else>
        <Movie 
            v-for="movie in searchStore.searchMovies" 
            :key="movie.id" 
            :movie="movie"
            :isSearch="true"
        />
    </div>
</template>

<style lang="scss" scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>