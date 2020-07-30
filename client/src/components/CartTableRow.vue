<template>
  <tr>
    <td scope="row">
      <img
        class="checkout-img"
        :src="cart.Product.image_url"
      />
    </td>
    <td class="align-middle">{{cart.Product.name}}</td>
    
    <td class="align-middle">Rp. {{totalPrice}}</td>
    <td class="align-middle quantity-toggle">
      <div class="row">
        <v-btn v-if="cart.quantity > 1" @click.prevent="subtractQuantity" class="quantity-button" icon color="grey">
          <v-icon>fas fa-minus</v-icon>
        </v-btn>
        <v-btn v-else disabled @click.prevent="subtractQuantity" class="quantity-button" icon color="grey">
          <v-icon>fas fa-minus</v-icon>
        </v-btn>
        <div class="quantity">{{cart.quantity}}</div>
        <v-btn v-if="cart.quantity < cart.Product.stock" @click.prevent="addQuantity" class="quantity-button" icon color="grey">
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
        <v-btn v-else disabled @click.prevent="addQuantity" class="quantity-button" icon color="grey">
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
      </div>
    </td>
    <td class="align-middle">
      <v-btn @click.prevent="removeProduct" class="delete-button" icon color="grey">
        <v-icon>fas fa-trash-alt</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: ['cart'],
  methods: {
      addQuantity() {
          this.$store.dispatch('addQuantity', this.cart.id)
      },
      subtractQuantity() {
          this.$store.dispatch('subtractQuantity', this.cart.id)
      },
      removeProduct() {
          this.$store.dispatch('removeProduct', this.cart.id)
      }
  },
  computed: {
      totalPrice() {
          let totalPrice = (this.cart.Product.price * this.cart.quantity)
          return parseFloat(totalPrice).toLocaleString('id') 
      }
  }
};
</script>

<style>
</style>