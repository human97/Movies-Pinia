<script setup>
import { ref } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { useTabsStore } from '@/stores/TabsStore';
import { useSearchStore } from '@/stores/SearchStore';
import Search from '@/components/Search.vue';
import Movie from '@/components/Movie.vue';
import AppTabs from '@/components/UI/AppTabs.vue';

const movieStore = useMovieStore();
const tabsStore = useTabsStore();
const searchStore = useSearchStore();

const selectedTab = ref(tabsStore.tabs[0].name)
const tabs = tabsStore.tabs
const changeTab = (tabName) => {
    selectedTab.value = tabName
}
</script>

<template>
  <main class="main">
    <header class="header">
      <img src="/logo.svg" alt="logo" class="header-logo" />
      <h1>Favorite Movies</h1>
    </header>

    <app-tabs
      color="info"
      :names="tabs"
      :selectedTab="selectedTab"
      @changeTab="changeTab"
    >
      <div 
          v-if="selectedTab === 'Search'" 
          class="movies"
      >
        <h2>Search Movies: {{ searchStore.searchCountMovies }}</h2>
        
        <Search />

      </div>
      <div 
          v-if="selectedTab === 'Favorite'" 
          class="movies"
      >
        <h2>Favorite Movies</h2>
        
        <Movie
          v-for="movie in  movieStore.movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <div 
        v-if="selectedTab === 'Watched'" 
        class="movies"
      >
        <h2>Watched Movies</h2>
        
        <Movie
          v-for="movie in  movieStore.watchedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </app-tabs>
  </main>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  &-logo {
    max-width: 50px;
    margin-right: 10px;
  }
}

.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;

  &:hover {
    opacity: 0.7;
  }
  &_green {
    background: #37df5c;
  }
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
