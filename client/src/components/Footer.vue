
  <template>
  <v-card height="150">
    <v-footer
      absolute
      class="font-weight-medium"
      color="black"
    >
      <v-col
        class="text-center"
        cols="12"
        style="color: white;"
      >
        {{ new Date().getFullYear() }} — <strong>Made with 	&#10084; by Kevin Geraldy</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>


<script>
export default {
    name: "Footer"
}
</script>

<style>

</style>