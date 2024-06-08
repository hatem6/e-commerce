<template>
  <section class="shop-cart spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="shop__cart__table">
            <table>
              <thead class="thead">
                <tr>
                  <th class="Name">Name</th>
                  <th class="Size">size</th>
                  <th class="Qunatity">Quantity</th>
                  <th>Price</th>
                  <th>Product</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="cartTableBody">
                <tr v-for="(product, index) in products" :key="index">
                  <td class="productName">{{ product.productName }}</td>
                  <td>{{ product.productSize }}</td>
                  <td>{{ product.productQuantity }}</td>
                  <td>{{ product.productPrice }}</td>
                  <td>
                    <img
                      :src="product.productUrl || defaultImageURL"
                      alt=""
                      style="width: 100px; height: auto"
                    />
                  </td>
                  <td>
                    <button style="border: 0; background: none">
                      <i
                        class="fas fa-trash-alt"
                        @click="removeProduct(index)"
                      ></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="cart__btn">
            <router-link to="/">Continue Shopping</router-link>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="cart__btn update__btn">
            <a href="#"><span class="icon_loading"></span> Update cart</a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 offset-lg-2">
          <div class="cart__total__procced">
            <h6>Cart total</h6>
            <ul>
              <li>
                Total <span class="Total">{{ total }} DT</span>
              </li>
            </ul>

            <router-link to="/checkout" class="primary-btn"
              >Proceed to checkout</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// main.js or app.js
import "@fortawesome/fontawesome-free/css/all.css";
export default {
  data() {
    return {
      products: [],
      total: 0,
    };
  },
  methods: {
    removeProduct(index) {
      this.products.splice(index, 1); // Remove the product from the products array
      localStorage.setItem("savedShop", JSON.stringify(this.products)); // Update localStorage
      this.products = JSON.parse(localStorage.getItem("savedShop") || "[]"); // Update Vue data
      window.location.reload();
    },
    calcTotal() {
      for (let i = 0; i < this.products.length; i++) {
        this.total +=
          parseInt(this.products[i].productPrice) *
          parseInt(this.products[i].productQuantity);
      }
    },
  },
  mounted() {
    const savedShop = localStorage.getItem("savedShop");
    this.products = JSON.parse(savedShop);
    this.calcTotal();
  },
};
</script>
<style scoped>
/* Shop cart section */
.shop-cart {
  padding: 20px;
  background-color: #f9f9f9;
}

/* Table container */
.shop__cart__table {
  overflow-x: auto;
  margin-bottom: 20px;
}

/* Table */
.shop__cart__table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  table-layout: fixed;
  max-height: 300px;
  overflow-y: auto;
}

/* Table headers */
.shop__cart__table th {
  text-align: left;
  padding: 12px;
  background-color: #ebebeb;
}

/* Table data cells */
.shop__cart__table td {
  border-bottom: 1px solid #ddd;
  padding: 12px; /* Consistent padding */
  word-wrap: break-word;
  font-size: 14px; /* Adjusted font size */
}

/* Buttons */
.cart__btn a,
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

.cart__btn a:hover,
.primary-btn:hover {
  background-color: #555;
}

/* Total section */
.cart__total__procced {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.cart__total__procced h6 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

.cart__total__procced ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart__total__procced ul li {
  font-size: 16px;
  margin-bottom: 8px;
  color: #666;
}

.Total {
  color: #ca1515;
}
@media screen and (max-width: 768px) {
  .productName,
  .Size,
  .thead {
    display: none;
  }

  .shop__cart__table table {
    overflow-x: auto;
    overflow-y: auto; /* Change to 'auto' to enable scroll only when necessary */
    display: block;
    white-space: nowrap;
    max-height: calc(100vh - 200px); /* Set maximum height */
  }

  .shop__cart__table button i {
    font-size: 18px;
  }
}
</style>
