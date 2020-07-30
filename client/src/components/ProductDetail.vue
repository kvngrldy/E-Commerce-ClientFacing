<template>
  <v-row justify="center">
    <v-btn icon color="blue" @click.stop="dialog = true">
      <v-icon>fas fa-shopping-cart fa-lg</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="450">
      <v-card class="mx-auto my-0">
        <v-img
          height="400"
          :src="product.image_url"
        ></v-img>
        <v-card-text style="padding-bottom: 0px;">
          <v-chip class="ma-2 ml-4 my-0" label small text-color="white" color="black">RG</v-chip>
          <v-row align="center" class="mx-0 justify-lg-space-between">
            <v-card-title class="col" style="padding-top: 5px; padding-bottom:0;">{{ product.name }}</v-card-title>
            <v-rating
              :value="4.5"
              class="col ml-3 mx-0 my-0"
              align="right"
              style="padding-top: 0;"
              color="amber"
              dense
              half-increments
              readonly
              size="20"
            ></v-rating>
          </v-row>
          <v-card-subtitle style="padding-top: 0;">Rp. {{product.price}}</v-card-subtitle>
          <v-row align="center" class="mx-0 my-0 justify-lg-space-between">
            <v-card-subtitle class="col" style="padding-top: 0px; padding-bottom:0;">Manufacturer:</v-card-subtitle>
            <v-card-subtitle class="col mr-5 font-weight-black" style="padding: 5px;">Bandai Hobby</v-card-subtitle>
          </v-row>
          <v-row align="center" class="mx-0 my-0 justify-lg-space-between">
            <v-card-subtitle
              class="col"
              style="padding-top: 0px; padding-bottom:0;"
            >Product Dimension:</v-card-subtitle>
            <v-card-subtitle
              class="col mr-5 font-weight-black"
              style="padding: 5px;"
            >12.7 x 12.7 x 20 cm</v-card-subtitle>
          </v-row>
          <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
            <v-card-subtitle class="col" style="padding-top: 0px; padding-bottom:0;">Weight:</v-card-subtitle>
            <v-card-subtitle class="col mr-5 font-weight-black" style="padding: 5px;">800 gr</v-card-subtitle>
          </v-row>

          <v-card-subtitle
            class="font-italic font-weight-light"
            style="padding-top:0px;"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</v-card-subtitle>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="text-center" >
            <v-btn @click.prevent="addToCart" rounded color="#0E004B" class="orange--text" dark><span class="mr-3" ><v-icon style="font-size: 0.5rem; color:#F2AE11; margin-bottom: 2px;">fas fa-plus fa-lg</v-icon></span>Add to Cart</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      dialog: false,
    };
  },
  props: ['product'],
  methods: {
      addToCart() {
          this.$store.dispatch('addToCart', this.product.id)
      }
  }
};
</script>

<style>
</style>