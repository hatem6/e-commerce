<template>
  <section class="contact spad">
    <div class="">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="contact__content">
            <div class="contact__address">
              <h5>Contact info</h5>
              <ul>
                <li>
                  <h6><i class="fa fa-map-marker"></i> Address</h6>
                  <p>Ariana soukra dar fadhal</p>
                </li>
                <li>
                  <h6><i class="fa fa-phone"></i> Phone</h6>
                  <p><span>53688551</span></p>
                </li>
                <li>
                  <h6><i class="fa fa-headphones"></i> Support</h6>
                  <p>offline@gmail.com</p>
                </li>
              </ul>
            </div>
            <div class="contact__form">
              <h5>SEND MESSAGE</h5>
              <form @submit.prevent="submitForm">
                <input
                  type="text"
                  placeholder="Full Name"
                  v-model="fullname"
                  required
                />
                <input
                  type="text"
                  placeholder="Email"
                  v-model="email"
                  required
                />

                <textarea
                  placeholder="Message"
                  v-model="message"
                  required
                ></textarea>
                <button type="submit" class="btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="contact__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25533.95648060499!2d10.258336161585744!3d36.87253262553418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b55acf2c3391%3A0xee6148a5320cb4b7!2sLa%20Soukra!5e0!3m2!1sfr!2stn!4v1700996288304!5m2!1sfr!2stn"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
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
      fullname: "",
      email: "",
      message: "",
    };
  },
  methods: {
    async submitForm() {
      const { fullname, email, message } = this;
      try {
        const response = await axios.post(
          "https://server-rlwuyzc0s-hatem6.vercel.app/contact",
          {
            fullname,
            email,
            message,
          }
        );
        if (response.status === 200) {
          toast.success("Message sent successfully!", {
            autoClose: 3000, // Optionally set autoClose time
            onClose: () => {
              // Code to execute after toast auto-closes
              this.message = "";
            },
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
};
</script>
<style scoped>
/*---------------------
  Contact
-----------------------*/
.contact {
  padding-top: 80px;
  padding-bottom: 80px;
}

.contact__address {
  margin-bottom: 45px;
}

.contact__address h5 {
  color: #111111;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.contact__address ul li {
  list-style: none;
  position: relative;
  margin-bottom: 20px;
}

.contact__address ul li:last-child {
  margin-bottom: 0;
}

.contact__address ul li h6 {
  color: #111111;
  font-weight: 600;
  margin-bottom: 10px;
}

.contact__address ul li h6 i {
  font-size: 16px;
  color: #ca1515;
  margin-right: 5px;
}

.contact__address ul li p {
  margin-bottom: 0;
  font-size: 15px;
  color: #444444;
}

.contact__address ul li span {
  font-size: 15px;
  color: #444444;
  display: inline-block;
  margin-right: 25px;
  position: relative;
}

.contact__address ul li span:after {
  position: absolute;
  right: -15px;
  top: 11px;
  content: "|";
  line-height: 0;
}

.contact__address ul li span:last-child {
  margin-right: 0;
}

.contact__address ul li span:last-child:after {
  display: none;
}

.contact__form h5 {
  color: #111111;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 35px;
}

.contact__form form input {
  height: 50px;
  width: 100%;
  padding-left: 20px;
  font-size: 14px;
  color: #444444;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin-bottom: 20px;
}

.contact__form form input::-webkit-input-placeholder {
  color: #444444;
}

.contact__form form input::-moz-placeholder {
  color: #444444;
}

.contact__form form input:-ms-input-placeholder {
  color: #444444;
}

.contact__form form input::-ms-input-placeholder {
  color: #444444;
}

.contact__form form input::placeholder {
  color: #444444;
}

.contact__form form textarea {
  height: 130px;
  width: 100%;
  padding-left: 20px;
  padding-top: 12px;
  font-size: 14px;
  color: #444444;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin-bottom: 14px;
  resize: none;
}

.contact__form form textarea::-webkit-input-placeholder {
  color: #444444;
}

.contact__form form textarea::-moz-placeholder {
  color: #444444;
}

.contact__form form textarea:-ms-input-placeholder {
  color: #444444;
}

.contact__form form textarea::-ms-input-placeholder {
  color: #444444;
}

.contact__form form textarea::placeholder {
  color: #444444;
}

.contact__map {
  height: 780px;
}

.contact__map iframe {
  width: 100%;
}

.btn {
  font-size: 14px;
  color: #111111;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  padding: 14px 30px 12px;
  background: #ca1515;
  color: #fff;
}
</style>
