<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-7">
          <div class="footer__about">
            <div class="footer__logo">
              <a href="./index.html"
                ><img src="../assets/YOLO.png" style="width: 250px" alt=""
              /></a>
            </div>
            <p>
              WELCOME TO YOLO WORLD . Ofc it’s not about what you wear , it’s about how you feel “ YOLO right here to makes you live it the way you want . remember ! focus on the chicken not the eggs 😛
            </p>
          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-5"></div>
        <div class="col-lg-2 col-md-3 col-sm-4">
          <div class="footer__widget">
            <h6>Quick links</h6>
            <ul>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-8 col-sm-8">
          <div class="footer__newslatter">
            <div class="footer__social">
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
                  /></svg
              ></a>

              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-whatsapp"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                  /></svg
              ></a>
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                  /></svg
              ></a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="footer__copyright__text">
            <p>
              Copyright &copy; All rights reserved .<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style scoped>
/*---------------------
  Footer
-----------------------*/


@media screen and (min-width:800px) {
  
.row{
  position: relative;
  left:30%;
  width:600px;
}
}


@media screen and (min-width:1200px) {
  
  .row{
    position: relative;
    left:20%;
    width:900px;
  }
  }
  



.footer {
  padding-top: 55px;
}

.footer__about {
  margin-bottom: 30px;
}

.footer__about p {
  margin-bottom: 20px;
}

.footer__logo {
  margin-bottom: 20px;
}

.footer__payment a {
  margin-right: 6px;
  margin-bottom: 10px;
  display: inline-block;
}

.footer__payment a:last-child {
  margin-right: 0;
}

.footer__widget {
  margin-bottom: 30px;
}

.footer__widget h6 {
  color: #111111;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.footer__widget ul li {
  list-style: none;
}

.footer__widget ul li a {
  font-size: 14px;
  color: #666666;
  line-height: 30px;
}

.footer__newslatter {
  margin-bottom: 30px;
}

.footer__newslatter h6 {
  color: #111111;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 25px;
}

.footer__newslatter form {
  position: relative;
  margin-bottom: 30px;
}

.footer__newslatter form input {
  height: 52px;
  width: 100%;
  border: 1px solid #e1e1e1;
  border-radius: 50px;
  padding-left: 30px;
  font-size: 14px;
  color: #666666;
}

.footer__newslatter form input::-webkit-input-placeholder {
  color: #666666;
}

.footer__newslatter form input::-moz-placeholder {
  color: #666666;
}

.footer__newslatter form input:-ms-input-placeholder {
  color: #666666;
}

.footer__newslatter form input::-ms-input-placeholder {
  color: #666666;
}

.footer__newslatter form input::placeholder {
  color: #666666;
}

.footer__newslatter form button {
  position: absolute;
  right: 4px;
  top: 4px;
}

.footer__social a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background: #e1e1e1;
  font-size: 15px;
  color: #111111;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  margin-right: 6px;
  margin-bottom: 5px;
}

.footer__social a:last-child {
  margin-right: 0;
}

.footer__copyright__text {
  border-top: 1px solid #e1e1e1;
  padding: 18px 0 25px;
  text-align: center;
  margin-top: 35px;
}

.footer__copyright__text p {
  margin-bottom: 0;
}

.footer__copyright__text a {
  color: #5c5c5c;
}

.footer__copyright__text i {
  color: #ca1515;
}

.footer__copyright__text a:hover {
  color: #ca1515;
}

/*---------------------
  Breadcrumb
-----------------------*/

.breadcrumb-option {
  padding-top: 35px;
}

.breadcrumb__links a {
  font-size: 15px;
  font-weight: 500;
  color: #111111;
  margin-right: 18px;
  display: inline-block;
  position: relative;
}

.breadcrumb__links a:after {
  position: absolute;
  right: -14px;
  top: 0;
  content: "";
  font-family: "FontAwesome";
}

.breadcrumb__links a i {
  margin-right: 5px;
}

.breadcrumb__links span {
  font-size: 15px;
  font-weight: 500;
  color: #888888;
  display: inline-block;
}
</style>
