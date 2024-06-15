<template>
  <section class="product-details spad">
    <div class="container">
      <div class="row ">
        <div class="col-lg-6 h-72 md:h-auto">
          <div class="product__details__pic  ">
            <div class="product__details__slider__content">
              <div class="product__detail__pic">
                <img class="product__big__img" :src="productUrl" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="product__details__text">
            <h3>{{ productName }}</h3>
            <p>Brand: YOLO</p>
            <div class="rating flex">
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
            <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
          </svg>
            </div>
            

            <h2 id="price" style="color: #ca1515">{{ productPrice }} $</h2>

            <p>
              Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret
              fugit, sed quia consequuntur magni lores eos qui ratione
              voluptatem sequi nesciunt.
            </p>

            <div class="product__details__widget">
              <ul>
                <li>
                  <span>Available size:</span>
                  <div class="size__btn">
                    <label for="size-xs" class="active">
                      <p
                        id="size-xs"
                        class="size-option"
                        :class="{ selected: productSize === 'XS' }"
                        data-value="xs"
                        @click="setProductSize('XS')"
                      >
                        xs
                      </p>
                    </label>
                    <label for="size-s">
                      <p
                        id="size-s"
                        class="size-option"
                        :class="{ selected: productSize === 'S' }"
                        data-value="s"
                        @click="setProductSize('S')"
                      >
                        s
                      </p>
                    </label>
                    <label for="size-m">
                      <p
                        id="size-m"
                        class="size-option"
                        :class="{ selected: productSize === 'M' }"
                        data-value="m"
                        @click="setProductSize('M')"
                      >
                        m
                      </p>
                    </label>
                    <label for="size-l">
                      <p
                        id="size-l"
                        class="size-option"
                        :class="{ selected: productSize === 'L' }"
                        data-value="l"
                        @click="setProductSize('L')"
                      >
                        l
                      </p>
                    </label>
                  </div>
                </li>
                <li>
                  <span>Promotions:</span>
                  <p>Free shipping</p>
                </li>
              </ul>
            </div>
            <div class="product__details__button">
              <div class="quantity">
                <span>Quantity:</span>
                <div class="pro-qty">
                  <input type="text" v-model="productQuantity" />
                </div>
              </div>
              <router-link to="#" class="cart-btn" @click="sendDataToNavbar">
                Add to cart</router-link
              >
              
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="product__details__tab">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#tabs-1"
                  role="tab"
                  >Description</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                  >Specification</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab"
                  >Reviews ( 2 )</a
                >
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tabs-1" role="tabpanel">
                <h6>Description</h6>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut loret fugit, sed quia consequuntur magni dolores eos
                  qui ratione voluptatem sequi nesciunt loret. Neque porro lorem
                  quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut loret
                  fugit, sed quia ipsu consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt. Nulla consequat massa quis
                  enim.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { eventBus } from "./eventBus";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {
      productName: "",
      productPrice: "",
      productUrl: "",
      productSize: "",
      productQuantity: 1,
    };
  },
  methods: {
    setProductSize(size) {
      this.productSize = size;
    },
    sendDataToNavbar() {
      if (
        this.productSize === "" ||
        this.productQuantity === "" ||
        parseInt(this.productQuantity) <= 0
      ) {
        const errorMessage =
          this.productSize === ""
            ? "Choose your Size please!"
            : "Choose your Quantity please!";
        toast.error(errorMessage, {
          autoClose: 3000,
        });
      } else {
        const dataToSend = {
          productName: this.productName,
          productPrice: this.productPrice,
          productUrl: this.productUrl,
          productQuantity: this.productQuantity,
          productSize: this.productSize,
        };
        eventBus.emit("dataToNavbar", dataToSend);
        this.showSuccessMessage();
      }
    },
    showSuccessMessage() {
      toast.success("Product added successfully", {
        autoClose: 2000,
      });
      setTimeout(() => {
        this.$router.push("/shop");
      }, 3000);
    },
  },

  created() {
    // Accessing route params
    this.productName = this.$route.params.productName;
    this.productPrice = this.$route.params.productPrice;
    this.productUrl = this.$route.params.productUrl;
  },
};
</script>
<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

.selected {
  color: #ca1515; /* Set the color you prefer for the selected size */
}
</style>
