<template>
  <nav class="w-full md:border-0">
   
    <div class="items-center px-4 max-w-screen-xl mx-auto md:flex space-x-10">
     
      <div class="flex items-center justify-between py-3 md:py-5 md:block">
        <div class="md:hidden"> <img class="" src="https://i.postimg.cc/26h8mJYV/YOLO-1.png" width="40"  alt="img"></div>
        <a class="flex">
          <img  class="hidden md:block" src="https://i.postimg.cc/26h8mJYV/YOLO-1.png" width="40"  alt="img">
          <img
            src="../assets/YOLO.png"
            width="120"
            height="50"
            alt="Float UI logo"
          />
        </a>
        <div class="md:hidden">
          <button class="" @click="menuOpen()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        class="flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0"
        :class="[open ? 'block' : 'hidden']"
      >
        <!-- Navigation Links -->
        <ul
          class="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0"
        >
          <li
            v-for="link in navigation"
            :key="link.id"
            class="text-gray-600 hover:text-red-600"
          >
            <a :href="link.router">
              {{ link.title }}
            </a>
          </li>
          <!-- Log In and Sign Up links -->
          <li>
            <router-link
              to="#"
              class="py-2 px-2 text-gray-600 hover:text-red-700"
            >
              about
            </router-link>
          </li>
          <li>
            <router-link
              to="/faqs"
              class="py-2 px-2 text-[#000000] hover:text-red-700"
            >
              FAQ
            </router-link>
          </li>
          <li>
            <a
              href="/signin"
              class="py-2 px-2 text-white bg-gray-950 hover:bg-gray-800 rounded-md shadow"
            >
              Sign in
            </a>
          </li>
        </ul>
      </div>
      <div class="pb-3 md:block md:mt-0" :class="[open ? 'block' : 'hidden']">
       
      

          <router-link to="/shop" class="py-2 px-2 text-[#000000]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
            />
          </svg>
          <span
            class="relative bottom-8 left-3 h-4 w-4 rounded-full bg-red-600 flex items-center justify-center"
          >
            <span class="text-white text-xs">{{ shop.length }}</span>
          </span>
        </router-link>
    
        
        
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { eventBus } from "./eventBus";
export default {
  data: function () {
    return {
      navigation: [
        { title: "Home", router: "/" },
        { title: "Contact", router: "/contact" },
      ],
      shop: [],
    };
  },
  setup() {
    let open = ref(false);
    function menuOpen() {
      open.value = !open.value;
    }
    return { open, menuOpen };
  },
  mounted() {
    const savedShop = localStorage.getItem("savedShop");
    if (savedShop) {
      this.shop = JSON.parse(savedShop);
    }
    eventBus.on("dataToNavbar", (data) => {
      this.shop.push(data);
      localStorage.setItem("savedShop", JSON.stringify(this.shop));
    });
  },
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

</style>
