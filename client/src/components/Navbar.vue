<template>
  <div class="mt-7">
    <v-app-bar color="white" dense flat>
      <a>
        <div @click.prevent="toHome" class="home">
          <img src="../assets/gundam.png" class="logo-gundam" />
        </div>
      </a>
      <a>
        <div @click.prevent="toHome" class="home">
          <v-toolbar-title class="title">GNDM-STR</v-toolbar-title>
        </div>
      </a>

      <v-spacer></v-spacer>

      <v-btn @click.prevent="toCheckout" class="cart-button mb-6 mx-10" icon color="#0D47A1">
        <v-badge v-if="numberOfItem > 0" color="red" :content="numberOfItem" class="mr-4">
          <v-icon>fas fa-shopping-bag</v-icon>
        </v-badge>
        <v-icon v-else>fas fa-shopping-bag</v-icon>
      </v-btn>

      <v-toolbar-title class="title mb-6">{{ email }}</v-toolbar-title>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mb-5" icon v-bind="attrs" v-on="on">
            <v-icon color="#0D47A1">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 1" :key="n" @click="() => {}">
            <v-list-item-title @click.prevent="logout">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    toCheckout() {
      this.$store.dispatch("toCheckout");
    },
    toHome() {
      this.$store.dispatch("toHome");
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    email() {
      return localStorage.Email;
    },
    numberOfItem() {
      return this.$store.state.carts.length;
    },
  },
};
</script>

<style>
.title {
  color: #0d47a1;
}

.logo-gundam {
  width: 6rem;
  height: auto;
}
</style>