import { defineStore } from "pinia";

export const useTabsStore = defineStore("tabsStore", () => {
 const tabs = [
    {name: 'Search', label: 'Search'},
    {name: 'Favorite', label: 'Favorite'},
    {name: 'Watched', label: 'Watched'},
 ];

 return { tabs }
})