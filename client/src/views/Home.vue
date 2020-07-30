<template>
  <div>
    <Navbar v-if="loginStatus" ></Navbar>
    <NavbarLogout v-else></NavbarLogout>
    <div class="banner row">
      <div class="col banner-text">
        <h1 class="font-light-black display-1">Shop Your Next</h1>
        <h1 class="font-weight-black display-4">Gunpla</h1>
        <a>
          <div @click.prevent="$vuetify.goTo(target, option)">
            <h2 class="start-nav display 3">Start &rarr;</h2>
          </div>
        </a>
      </div>
      <div class="col banner-img">
        <img
          class="gunpla-home"
          src="https://cdn.shopify.com/s/files/1/2786/5582/products/IMG_9799_clipped_rev_1_1024x1024.png?v=1583264977"
        />
      </div>
    </div>
    <div class="container">
      <div class="container banner giveaway">
        <div class="row giveaway-banner">
          <div class="col giveaway-banner-image d-inline-flex">
            <img
              class="gunpla-giveaway"
              src="https://i.pinimg.com/originals/03/a7/41/03a7418e22f1c12d8eae6fb12b088b49.png"
            />
          </div>

          <div  class="col banner-text" style="padding-left: 0px; color: white;">
            <h1 class="font-weight-black display-1">SIGN UP FOR GIVEAWAY</h1>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta</p>
            <div class="my-2">
              <v-btn depressed color="primary">Sign Up</v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="heading" id="collection">
        <h1 class="container font-weight-black display-1">Our Collection</h1>
      </div>

      <div class="mx-auto row product-list">
    
          <Card class="card-hover" v-for="product in products" :key="product.id" :product="product"></Card>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import NavbarLogout from "../components/NavbarLogout"
import Card from "../components/productCard";
import Footer from "../components/Footer";
export default {
  name: "Home",
  components: {
    Navbar,
    Card,
    Footer,
    NavbarLogout
  },
  data() {
    return {
      duration: 300,
      offset: 0,
      easing: "easeInOutCubic",
      
    };
  },
  computed: {
    target() {
      return "#collection";
    },
    option() {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing,
        }
    },
    loginStatus() {
        return this.$store.state.isLogin
    },
    products() {
        return this.$store.state.products
    },
    checkToken() {
        return this.localStorage.token
    },
    carts() {
          return this.$store.state.carts
      }
  },
  created() {
       this.$store.dispatch('fetchProducts')
       this.$store.dispatch('loginCheck')
  }
};
</script>

<style>
@keyframes bounce {
	0%, 20%, 60%, 100% {
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}

	40% {
		-webkit-transform: translateY(-20px);
		transform: translateY(-20px);
	}

	80% {
		-webkit-transform: translateY(-10px);
		transform: translateY(-10px);
	}
}

img {
  height: 40rem;
}


.card-hover { transition: all .2s ease-in-out; }
.card-hover:hover { transform: scale(0.9); }

.start-nav {
    color: #0d47a1;
}

.start-nav:hover{
    color: #0d47a1;
    font-size: 250%;
}

.card-card {
  border-radius: 1rem !important;
  -webkit-box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.41) !important;
  -moz-box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.41) !important;
  box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.41) !important;
}

.banner-text {
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding-left: 10rem;
}

.giveaway-banner {
  display: flex;
  background: rgb(11, 4, 15);
  background: linear-gradient(
    90deg,
    rgba(11, 4, 15, 1) 0%,
    rgba(28, 59, 70, 1) 50%,
    rgba(31, 64, 104, 1) 100%
  );
  margin: 0% !important;
  border-radius: 1rem;
  height: 20rem;

  -webkit-box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.7) !important;
  -moz-box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.7) !important;
  box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.7) !important;
}

.giveaway-banner:hover {
    animation: bounce 1s;
}

.giveaway {
  margin-top: 8rem;
  margin-bottom: 10rem;
}

.gunpla-giveaway {
  position: absolute;
  top: -30%;
}

.top-collection {
  border-radius: 3rem;
}


.fade
{
        opacity:0.5;
}
.fade:hover
{
        opacity:1;
}
</style>