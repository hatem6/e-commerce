import { createRouter, createWebHistory } from "vue-router";
import About from "../components/About.vue";
import Account from "../components/Account.vue";
import Checkout from "../components/Checkout.vue";
import Contact from "../components/Contact.vue";
import Products from "../components/Products.vue";
import Shop from "../components/Shop.vue";
import Signin from "../components/Signin.vue";
import Signup from "../components/Signup.vue";

const routes = [
  {
    path: "/",
    name: "products",
    component: Products,
  },
  {
    path: "/about/:productName/:productPrice/:productUrl",
    name: "about",
    component: About,
    props: true, // This allows route params to be passed as component props
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
  {
    path: "/account",
    name: "account",
    component: Account,
  },
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
