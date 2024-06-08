<template>
  <div class="">
    <Navbar></Navbar>
    <br /><br /><br />
    <div class="container">
      <br />
      <Categorie v-if="!RouteHidden"></Categorie>
      <router-view class="components"></router-view>
    </div>
    <br /><br /><br />
    <Footer class="footer"> </Footer>
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import Categorie from "./components/Categorie.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Navbar,
    Categorie,
    Footer,
  },
  data() {
    return {
      RouteHidden: false,
    };
  },
  watch: {
    $route(to) {
      /* to hidden the categorie component from this routes */
      this.RouteHidden =
        to.name === "about" ||
        to.name === "contact" ||
        to.name === "shop" ||
        to.name === "signup" ||
        to.name === "signin" ||
        to.name === "checkout" ||
        to.name === "account";
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

@media screen and (max-width: 768px) {
  .container {
    display: block;
  }
}
</style>
