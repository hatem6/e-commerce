<template>
  <div class="col-lg-3 col-md-3 " id="categorie">
    <div class="shop__sidebar">
      <div class="sidebar__categories">
        <div class="section-title">
          <h4>Categories</h4>
        </div>
        <div class="categories__accordion">
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-heading">
                <h6>All</h6>
              </div>
              <div id="collapseOne" class="collapse show">
                <div class="card-body">
                  <ul>
                    <li>
                      <router-link to="/" @click="sendDataToProducts('All')"
                        >All-Products</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-heading">
                <h6>Men</h6>
              </div>
              <div id="collapseOne" class="collapse show">
                <div class="card-body">
                  <ul>
                    <li>
                      <router-link
                        to="/"
                        @click="sendDataToProducts('man', 't-shirt')"
                        >T-shirts</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        to="/"
                        @click="sendDataToProducts('man', 'jeans')"
                        >Jeans</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-heading">
                <h6>Women</h6>
              </div>
              <div id="collapseTwo" class="collapse show">
                <div class="card-body">
                  <ul>
                    <li>
                      <router-link
                        to="/"
                        @click="sendDataToProducts('woman', 'dresse')"
                        >Dresses</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        to="/"
                        @click="sendDataToProducts('woman', 'w-t-shirt')"
                        >T-shirts</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        to="/"
                        @click="sendDataToProducts('woman', 'w-jeans')"
                        >Jeans</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from "./eventBus";
export default {
  data() {
    return {};
  },
  methods: {
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

@media screen and (min-width:800px) {
  #categorie{
    position: fixed;
    background-color:white;
    width: 150px;
  }
}

</style>
