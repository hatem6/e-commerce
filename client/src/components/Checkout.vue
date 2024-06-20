<template>
  <section class="checkout spad">
    <div class="container">
      <form class="checkout__form" @submit.prevent="placeOrder">
        <div class="row">
          <div class="col-lg-8">
            <h5>Billing detail</h5>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="checkout__form__input">
                  <p>Full Name <span>*</span></p>
                  <input
                    id="fullName"
                    type="text"
                    v-model="fullname"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="checkout__form__input">
                  <p>Adress <span>*</span></p>
                  <input id="address" type="text" v-model="adress" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="checkout__form__input">
                  <p>Phone <span>*</span></p>
                  <input id="phone" type="text" v-model="phone" required />
                </div>
              </div>
            </div>
            <div class="checkout__order">
              <h5>Your order</h5>
              <div class="checkout__order__product">
                <ul class="order-list">
                  <li class="order-list__header">
                    <span class="order-list__item">Products</span>
                  </li>
                  <li
                    v-for="(product, index) in products"
                    :key="index"
                    class="order-list__item"
                  >
                    <div class="product-details">
                      <img
                        :src="product.productUrl || defaultImageURL"
                        alt=""
                        class="product-details__image"
                      />
                      <div class="product-details__info">
                        <p>
                          {{ product.productName }} ({{ product.productSize }})
                        </p>
                        <p>Quantity: {{ product.productQuantity }}</p>
                        <p>Price:{{ product.productPrice }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="checkout__order__total">
                <ul>
                  <li><span></span></li>
                  <li>
                    Total <span id="Total">{{ total }} $</span>
                  </li>
                </ul>
              </div>
              <button type="submit" class="primary-btn">Place Order</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {
      products: [],
      total: 0,
      fullname: "",
      adress: "",
      phone: "",
      date: "now",
    };
  },
  methods: {
    getAccountData() {
      let storedData = localStorage.getItem("Account");
      this.fullname = JSON.parse(storedData).fullname;
      this.adress = JSON.parse(storedData).adress;
      this.phone =  JSON.parse(storedData).phone;
    },
    calcTotal() {
      for (let i = 0; i < this.products.length; i++) {
        this.total +=
          parseInt(this.products[i].productPrice) *
          parseInt(this.products[i].productQuantity);
      }
    },
    async placeOrder() {
      const fullname = String(this.fullname);
      const adress = String(this.adress);
      const phone = String(this.phone);
      const date = String(this.date);
      const total = String(this.total);
      // Mapping products to match backend model fields
      const mappedProducts = this.products.map((product) => ({
        name: String(product.productName), // Convert to string explicitly
        price: String(product.productPrice), // Convert to string explicitly
        quantity: String(product.productQuantity), // Convert to string explicitly
        size: String(product.productSize), // Convert to string explicitly
        image: String(product.productUrl || ""), // Convert to string explicitly
      }));
      let myjson = {
        fullname,
        adress,
        phone,
        total,
        date,
        products: mappedProducts,
      };

      console.log(myjson);
      try {
        const response = await axios.post(
          "https://server-nu-cyan.vercel.app/orders/post",
          myjson,
          {
              headers: {
                Authorization: "Bearer Hatoum1234",
              },
            }
        );
        if (response.status === 200) {
          toast.success("Order Placed !", {
            autoClose: 3000, 
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
  mounted() {
    const savedShop = localStorage.getItem("savedShop");
    this.products = JSON.parse(savedShop);
    this.calcTotal();
    this.getAccountData();
    // Set current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(" ")[0]; // Format time as HH:MM:SS
    this.date = `${formattedDate} ${formattedTime}`; // Combine date and time
  },
};
</script>

<style scoped>
/* Add your custom CSS classes here */
.order-list {
  list-style: none;
  padding: 0;
}

.order-list__header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.order-list__item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0px; /* Adjusted padding */
  border-bottom: 1px solid #eee;
}

.product-details {
  display: flex;
  align-items: center;
}

.product-details__image {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.product-details__info {
  flex: 1;
  font-size: 14px;
  /* Adjust font size as needed */
}

.primary-btn {
  display: inline-block;
  padding: 12px 24px;
  text-decoration: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: background-color 0.3s; /* Smooth hover transition */
}

.primary-btn:hover {
  background-color: #555;
}
</style>
