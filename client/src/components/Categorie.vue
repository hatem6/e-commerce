<template>
  <div class="col-lg-3 col-md-3" id="categorie" data-aos="fade-down">
    <div class="shop__sidebar md:mr-5">
      <div class="sidebar__categories">
        <div class="section-title" @click="toggleCategoriesSection">
          <h4 class="cursor-pointer flex items-center justify-between">
            Categories
          <svg 
           v-if="isCategoriesSectionOpen"
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>
        <svg
             v-else
             xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
          </h4>
        </div>
        <div v-show="isCategoriesSectionOpen" class="categories__accordion">
          <div v-for="(category, index) in categories" :key="index" class="card">
            <div class="card-heading" @click="toggleCategory(index)">
              <h6 class="cursor-pointer flex items-center justify-between">
                {{ category.Name }}
                <svg 
                  v-if="selectedCategory ===index"
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                </svg>
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg>
              </h6>
            </div>
            <div v-show="selectedCategory === index" class="card-body">
              <ul>
                <li v-for="(subCategory, subIndex) in category.subCategories" :key="subIndex">
                  <router-link :to="subCategory.link" @click="sendDataToProducts(category.value, subCategory.value)">
                    {{ subCategory.Name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "./eventBus";
import "aos/dist/aos.css";
import AOS from "aos";
export default {
  data() {
    return {
      isCategoriesSectionOpen:false,
      selectedCategory: null,
      categories: [
        { 
          Name: "All",
          value: "All",
          subCategories: [{ Name: "All", value: "All", link: "/" }],
        },
        {
          Name: "Men",
          value: "man",
          subCategories: [
            { Name: "T-shirts", value: "t-shirt", link: "/" },
            { Name: "Jeans", value: "jeans", link: "/" },
          ],
        },
        {
          Name: "Women",
          value: "woman",
          subCategories: [
            { Name: "Dresses", value: "dresse", link: "/" },
            { Name: "T-shirts", value: "w-t-shirt", link: "/" },
            { Name: "Jeans", value: "w-jeans", link: "/" },
          ],
        },
      ],
    };
  },
  created() {
    this.$nextTick(() => {
      AOS.init({
        duration: 2500,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    });
  },
  methods: {
    toggleCategoriesSection() {
      this.isCategoriesSectionOpen = !this.isCategoriesSectionOpen;
    },
    toggleCategory(index) {
      this.selectedCategory = this.selectedCategory === index ? null : index;
    },
    sendDataToProducts(selectedGenre, selectedType) {
      const dataToSend = {
        genre: selectedGenre,
        type: selectedType,
      };
      eventBus.emit("dataToProducts", dataToSend);
    },
  },
};
</script>

<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

@media screen and (min-width: 800px) {
  #categorie {
    position: fixed;
    background-color: white;
    width: 150px;
  }
}
</style>
