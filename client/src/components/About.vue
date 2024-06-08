<template>
  <section class="product-details spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="product__details__pic">
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
            <p>Brand: OFFLINE</p>

            <h2 id="price" style="color: #ca1515">{{ productPrice }}</h2>

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
              <ul>
                <li>
                  <a href="#"><span class="icon_heart_alt"></span></a>
                </li>
                <li>
                  <a href="#"><span class="icon_adjust-horiz"></span></a>
                </li>
              </ul>
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
.selected {
  color: #ca1515; /* Set the color you prefer for the selected size */
}
</style>
