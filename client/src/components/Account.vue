<template>
  <div
    class="my-4 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto"
  >
    <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
      <div class="shrink-0 mr-auto sm:py-3">
        <p class="font-medium">Account Details</p>
        <p class="text-sm text-gray-600">Edit your account details</p>
      </div>
    </div>
    <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
      <p class="shrink-0 w-32 font-medium">Full Name</p>
      <input
        v-model="fullname"
        placeholder="Your Full Name"
        class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-gray-600 focus:ring-1"
      />
      <p class="shrink-1 w-32 font-medium">Adress</p>
      <input
        v-model="adress"
        placeholder="Your Adress"
        class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-gray-600 focus:ring-1"
      />
    </div>
    <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
      <p class="shrink-0 w-32 font-medium">Email</p>
      <input
        v-model="email"
        placeholder="your.email@domain.com"
        class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-gray-600 focus:ring-1"
      />
    </div>
    <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
      <p class="shrink-0 w-32 font-medium">Password</p>
      <input
        v-model="password"
        type="password"
        placeholder="******"
        class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-gray-600 focus:ring-1"
      />
    </div>
    <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
      <p class="shrink-0 w-32 font-medium">Phone Number</p>
      <input
        v-model="phone"
        placeholder="+216 "
        class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-gray-600 focus:ring-1"
      />
    </div>
    <div class="flex flex-col gap-4 py-4 lg:flex-row">
      <div class="shrink-0 w-32 sm:py-4">
        <p class="mb-auto font-medium">Avatar</p>
        <p class="text-sm text-gray-600">Change your avatar</p>
      </div>
      <div
        class="flex h-70 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center"
      >
        <div
          v-if="image == null"
          class="h-16 w-16 rounded-full"
          ref="lottieContainer"
        ></div>
        <img
          v-if="image != null"
          class="h-16 w-16 rounded-full"
          :src="image"
          alt=""
        />
        <p class="text-sm text-gray-600">
          Drop your desired image file here to start the upload
        </p>
        <input
          type="file"
          @change="handleImageChange"
          class="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-4 border-b py-4 sm:flex-row sm:justify-center"
    >
      <button
        @click="saveChanges"
        class="rounded-lg border-2 border-transparent bg-gray-950 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-gray-800"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>
<script>
import { Lottie } from "lottie-web";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import animationData from "../assets/animation/account.json";
export default {
  data() {
    return {
      fullname: "",
      adress: "",
      email: "",
      password:"",
      phone: "",
      image:"",
      update: false,
      imageFile:"",
    };
  },

  methods: {
    initializeLottie() {
      if (typeof Lottie === "undefined") {
        // If Lottie is undefined, attempt to load it
        import("lottie-web")
          .then(({ default: lottie }) => {
            this.loadAnimationWithData(lottie, animationData);
          })
          .catch((error) => {
            console.error("Error loading Lottie:", error);
          });
      } else {
        this.loadAnimationWithData(Lottie, animationData);
      }
    },
    loadAnimationWithData(lottieInstance, animationData) {
      const container = this.$refs.lottieContainer;
      if (!container || !lottieInstance || !animationData) return;

      lottieInstance.loadAnimation({
        container: container,
        renderer: "svg", // Choose the renderer you want (svg, canvas, html)
        loop: true,
        autoplay: true,
        animationData: animationData, // Your loaded animation data
      });
    },
    getAccountData() {
      let storedData = localStorage.getItem("Account");
      this.fullname = JSON.parse(storedData).fullname;
      this.adress = JSON.parse(storedData).adress;
      this.email = JSON.parse(storedData).email;
      this.password = JSON.parse(storedData).password;
      this.phone = "+216 " + JSON.parse(storedData).phone;
      this.image= JSON.parse(storedData).image;
    },
    async handleImageChange(event) {
      this.imageFile = event.target.files[0];
    },
    async saveChanges() {
  const email = this.email;
  const fullname = this.fullname; 
  const adress = this.adress;  
  const phone = this.phone;      
  const password = this.password;
  const imageFile = this.imageFile; // Assuming this is the file input

  let formData = new FormData();
  formData.append('email', email);
  formData.append('fullname', fullname);
  formData.append('adress', adress);
  formData.append('phone', phone);
  formData.append('password', password);

  // If there is an image file to upload
  if (imageFile) {
    formData.append('file', imageFile);
  }

  try {
    const response = await axios.put(
      "https://server-nu-cyan.vercel.app/customers/update",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer Hatoum1234`,
        },
      }
    );

    if (response.data.success) {
      console.log("Customer updated successfully", response.data.customer);
      toast.success("account updated successfully",{
        autoClose: 2000,
      });
    } else {
      console.error("Error updating customer: ", response.data.error);
    }
  } catch (error) {
    console.error("Error while updating the customer:", error);
  }
}

  },
  mounted() {
    this.initializeLottie();
    this.getAccountData();
  },
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
