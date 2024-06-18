<template>
  <main class="w-full h-screen flex flex-col items-center justify-center px-4">
    <div class="max-w-sm w-full text-gray-600 space-y-4">
      <div class="text-center pb-8 flex items-center justify-center">
        <div ref="lottieContainer"></div>
      </div>
      <form @submit.prevent="signUp" class="space-y-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label class="font-medium">Full name</label>
          <input
            v-model="fullname"
            type="text"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium">Address</label>
          <input
            v-model="adress"
            type="text"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div class="lg:col-span-2">
          <label class="font-medium">Phone Number</label>
          <input
            v-model="phone"
            type="text"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div class="lg:col-span-2">
          <label class="font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div class="lg:col-span-2">
          <label class="font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div class="lg:col-span-2">
          <label class="font-medium">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white font-medium bg-gray-950 hover:bg-gray-800 active:bg-gray-800 rounded-lg duration-150 lg:col-span-2"
        >
          Create
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
import lottie from "lottie-web";
import animationData from "../assets/animation/second.json";

export default {
  data() {
    return {
      fullname: "",
      adress: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    };
  },
  methods: {
    async signUp() {
      if (this.password === this.confirmPassword) {
        const myjson = {
          fullname: this.fullname,
          adress: this.adress,
          phone: this.phone,
          email: this.email,
          password: this.password,
        };
        try {
          const response = await axios.post(
            "https://server-nu-cyan.vercel.app/customers/signup",
            myjson,
            {
              headers: {
                Authorization: "Bearer Hatoum1234",
              },
            }
          );
          if (response.data.success) {
            window.location.href = "/signin";
          } else {
            toast.error("Email already exists", {
              autoClose: 2000,
            });
          }
        } catch (error) {
          console.error("Error:", error.response ? error.response.data : error.message);
          toast.error("Signup failed", {
            autoClose: 2000,
          });
        }
      } else {
        toast.error("Confirm your password!", {
          autoClose: 2000,
        });
      }
    },
    initializeLottie() {
      const container = this.$refs.lottieContainer;
      if (!container) return;

      lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    },
  },
  mounted() {
    this.initializeLottie();
  },
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
