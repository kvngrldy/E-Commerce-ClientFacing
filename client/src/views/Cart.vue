<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <table v-if="carts.length > 0" class="col-8 table mt-8 mr-8">
          <tbody>
            <TableRow v-for="cart in carts" :key="cart.id" :cart="cart"></TableRow>
          </tbody>
        </table> 
        <h1 v-else class="col text--disabled" style="margin-top: 10rem;">You Cart is Empty...</h1>
        <div class="col mt-5">
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <p class="display-1 font-weight-black text--primary ml-4">Order Summary</p>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle class="col" style="padding-top: 0px; padding-bottom:0;">Total Item:</v-card-subtitle>
                <v-card-subtitle class="col mr-5 font-weight-light" style="padding: 5px;">{{carts.length}} item(s)</v-card-subtitle>
              </v-row>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle
                  class="col"
                  style="padding-top: 0px; padding-bottom:0;"
                >Shipping Fee:</v-card-subtitle>
                <v-card-subtitle class="col mr-5 font-weight-light" style="padding: 5px;">Free</v-card-subtitle>
              </v-row>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-col>
                  <v-text-field
                    label="Promo Code"
                    placeholder="Enter Promo Code for Discount.."
                    outlined
                    style="height: 50px;"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-text>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle class="col-4" style="padding-top: 0px; padding-bottom:0;">Subtotal:</v-card-subtitle>
                <v-card-title
                  class="col font-weight-black "
                  style="padding: 5px;"
                >Rp. {{ price }} </v-card-title>
              </v-row>
            </v-card-text>
          </v-card>
          <div class="my-4 row">
            <v-btn @click="checkout" x-large color="success" class="col-7 mx-auto" dark>Checkout</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import TableRow from "../components/CartTableRow"
export default {
  name: "Cart",
  methods: {
      checkout() {
          this.$store.dispatch('checkout')
      }
  },
  data() {
      return {
          totalprice: 0,
      }
  },
  components: {
    Navbar,
    TableRow
  },
  created() {
      this.$store.dispatch('fetchCart')
  },
  computed: {
      carts() {
          return this.$store.state.carts
      },
      price() {
          let initialPrice = 0
          let totalPrice = 0
        //   let carts = this.$store.state.carts
        console.log(this.carts, `ini carts <><><><><>`)
          for(let i = 0; i < this.carts.length; i++) {
               initialPrice += (this.carts[i].Product.price * this.carts[i].quantity)
          }
           totalPrice = parseFloat(initialPrice).toLocaleString('id') 
          
          return totalPrice
      }
  }
};
</script>

<style>
.checkout-img {
  height: 8rem;
}

.quantity-toggle {
  display: flexbox;
  flex-direction: column;
  align-items: center;
}

.quantity-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity {
     border: 1px solid rgba(0, 0, 0);
    padding-top: 2px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
   align-items: center;
  justify-content: center; 
}
</style>