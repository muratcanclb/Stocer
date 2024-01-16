<template>
  <div class="card">
    <p v-if="havaDurumu" class="m-2">
      {{ havaDurumu[0].city}}:
      {{ havaDurumu[0].max}}
      {{ havaDurumu[0].weather}}
    </p>
  </div>
</template>
<script>
import {
  BCard,
  BCardHeader,
  BCardFooter,
  BCardBody,
  BButton,
  BFormInput,
  BFormGroup,
  VBToggle,
  BCollapse,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import axios from "axios";


export default {
  components: {
    //BVC
    BCard,
    BCardHeader,
    BCardFooter,
    BCardBody,
    BButton,
    BFormInput,
    BFormGroup,
    BCollapse,
    //Intra
  },
  directives: { Ripple, "b-toggle": VBToggle },
 
  data() {
    return {
      havaDurumu:null,
    };
  },
  methods: {
    getHavaDurumu() {
      axios
        .post(
          "https://localhost:44317/Api/PublicWidget/GetWeather",
          { City: ["SAMSUN"] },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log(response);
          this.havaDurumu = response.data;
        });
    },
  },
 

  mounted() {
    this.getHavaDurumu();
  },
};
</script>
<style>
</style>