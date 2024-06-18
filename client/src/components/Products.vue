<template>
  <div class="col-lg-9 col-md-9">
    <div class="row">
      <div
        class="col-lg-4 col-md-6"
        v-for="product in displayedProducts"
        :key="product.id"
      >
        <div class="product__item">
          <div class="product__item__pic set-bg">
            <router-link
              :to="{
                name: 'about',
                params: {
                  productName: product.name || 'Default Name',
                  productPrice: product.price || 'Default Price',
                  productUrl: product.url || 'Default Url',
                },
              }"
            >
              <img :src="product.url" alt="" />
            </router-link>
            <!-- Rest of your code -->
          </div>
          <div class="product__item__text">
            <h6 @click="myFunc">{{ product.name }}</h6>
            <div class="product__price">{{ product.price }}</div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
     
    </div>
  </div>
</template>
<script>
import { eventBus } from "./eventBus";
import axios from "axios";
export default {
  data() {
    return {
      Products: [],
      receivedData: null,
      genre: null,
      type: null,
    };
  },
  computed: {
    displayedProducts() {
      if (this.genre == null || this.genre == "All") {
        return this.Products;
      } else {
        return this.filterByGenre(this.Products);
      }
    },
  },
  methods: {
    filterByGenre(products) {
      if (this.genre === "man") {
        if (this.type == "t-shirt") {
          return products.filter((product) => product.type === "t-shirt");
        } else {
          return products.filter((product) => product.type === "jeans");
        }
      } else if (this.genre === "woman") {
        if (this.type == "dresse") {
          return products.filter((product) => product.type === "dresse");
        }
        else if(this.type == "w-t-shirt"){
          return products.filter((product) => product.type === "w-t-shirt");
        }
        else {
          return products.filter((product) => product.type === "w-jeans");
        }
      }
      return products;
    },

    fetchDataFromAPI() {
      axios
        .get(
          "https://server-nu-cyan.vercel.app/products",
          {
        headers: {
          'Authorization': 'Bearer Hatoum1234'
        }
      }
        )
        .then((response) => {
          //console.table(response.data);
          this.Products = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  mounted() {
    // Call the method to fetch data when the component is mounted
    eventBus.on("dataToProducts", (data) => {
      this.receivedData = data;
      this.genre = this.receivedData.genre;
      this.type = this.receivedData.type;
    });
    this.fetchDataFromAPI();
  },
};
</script>

<style scoped></style>
