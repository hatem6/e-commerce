<template>
  <main class="w-full h-screen flex flex-col items-center">
    <div class="max-w-sm w-full text-gray-600 space-y-10">
      <div class="text-center pb-8">
        <div class="mt-5">
          <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">
            Log in to your account
          </h3>
        </div>
      </div>
      <form @submit.prevent="check" class="space-y-5">
        <div>
          <label class="font-medium"> Email </label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Password </label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-x-3"></div>
          <a href="javascript:void(0)" class="text-center">Forgot password?</a>
        </div>
        <button
          class="w-full px-4 py-2 text-white font-medium bg-gray-950 hover:bg-gray-800 active:bg-gray-800 rounded-lg duration-150"
        >
          Log in
        </button>
      </form>

      <p class="text-center">
        Don't have an account?
        <router-link
          to="/signup"
          class="font-medium text-red-600 hover:text-red-500"
          >Sign up</router-link
        >
      </p>
    </div>
  </main>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async check() {
      let myjson = {
        email:this.email,
        password:this.password
      };
      try {
        const response = await axios.post(
          "https://server-nu-cyan.vercel.app/customers/signin",
          myjson,
          {
              headers: {
                Authorization: "Bearer Hatoum1234",
              },
            }
        );
        if (response.data.success== false) {
          toast.error("Invalid email or password!", {
            autoClose: 2000, // Optionally set autoClose time
          });
        } else {
            console.log("success");
            let account = {
              fullname: response.data.customer.fullname,
              adress: response.data.customer.adress,
              phone: response.data.customer.phone,
              email: response.data.customer.email,
              password: response.data.customer.password,
              image: response.data.customer.image,
            };
            localStorage.setItem("Account", JSON.stringify(account));
            window.location.href = "/account";
        }
      } catch (error) {
        console.error("Error while checking the account :", error);
      }
    },
  },
};
</script>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
