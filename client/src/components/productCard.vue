
  <template>
  <div class="col-3">
    <v-card class="mx-auto my-0 card-card" width="250">
      <v-img 
        height="250"
        :src="product.image_url"
      ></v-img>
      <v-chip class="ma-2 ml-4 my-0" label small text-color="white" color="black">RG</v-chip>
      <v-card-title style="padding-top: 5px;">{{ product.name }} </v-card-title>
      <v-card-subtitle>Rp. {{product.price}}</v-card-subtitle>
      <v-card-text>
        <v-row align="center" class="mx-0 justify-lg-space-between">
          <v-rating :value="4.5" color="amber" dense half-increments readonly size="20"></v-rating>
          <ProductDetail class="ml-10" :product="product"></ProductDetail>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
import ProductDetail from "../components/ProductDetail";
export default {
  name: "Card",
  components: {
    ProductDetail,
  },
  props: ['product']
};
</script>

<style>
</style>