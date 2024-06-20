<template>
  <div class="">
    <div class="navbar">
      <Navbar></Navbar>
    </div>
    <br /><br /><br /><br /><br />
    <div class="container">
      <br />
      <Categorie  v-if="!RouteHidden"></Categorie>
      <router-view  class="components"></router-view>
    </div>
    <br /><br /><br />
    <Footer class="footer"> </Footer>
  </div>
</template>
<script>
import "aos/dist/aos.css";
import AOS from "aos";
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

.navbar{
  background-color: rgb(244, 244, 244);
  position: fixed;
  z-index:999;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .container {
    display: block;
  }
}
</style>
