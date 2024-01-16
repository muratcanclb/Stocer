<template>
  <div class="card">
     <p v-if="prayer" class="m-2">
      İMSAK:{{ prayer.fajr}}<br><br>
      SABAH:{{ prayer.sunrise}}<br><br>
      ÖĞLE:{{ prayer.dhuhr}}<br><br>
      İKİNDİ:{{ prayer.asr}}<br><br>
      AKŞAM:{{ prayer.maghrib}}<br><br>
      YATSI:{{ prayer.isha}}<br><br>
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
  BCollapse,
  VBToggle,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import axios from "axios";

export default {
  name: "hava-durumu",
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

  data() {
    return {
    prayer: null
    };
  },
  methods: {
    getPrayerTime() {
      axios
        .post(
          "https://localhost:44317/Api/PublicWidget/GetPrayerTime",
          { Latitude: 41,
            Longitude: 28,
            date:"2021-09-15" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log(response);
          this.prayer = response.data;
        });
    },},
  mounted() {
    this.getPrayerTime();
  },
};
</script>
<style>
</style>