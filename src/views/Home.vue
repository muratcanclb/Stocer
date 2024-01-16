<template>
  <div>
    <b-card title="HAVA DURUMU" style="max-width: 20rem" class="mb-2">
      <b-card-text>GÜNCEL HAVA DURUMU</b-card-text>
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group label="ŞEHİR SEÇİNİZ" label-for="City">
              <b-form-select v-model="form.City" :options="city" />
              <div class="mt-3">
                Selected: <strong>{{ form.City }}</strong>
              </div>
              
              <div id="status">
                {{ getHavaDurumu() }}
              </div>
              <p v-if="havaDurumu" class="m-2">
                {{ havaDurumu[0].city }}
                {{ havaDurumu[0].max }}
                {{ havaDurumu[0].weather }}
              </p>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card
      title="NAMAZ "
      header-tag="header"
      footer-tag="footer"
      style="max-width: 20rem"
      class="mb-2"
    >
      <template #header>
        <h6 class="mb-0">NAMAZ VAKİTLERİ</h6>
      </template>
      <b-card-text>
        <p v-if="prayer" class="m-2">
          İMSAK:{{ prayer.fajr }}<br /><br />
          SABAH:{{ prayer.sunrise }}<br /><br />
          ÖĞLE:{{ prayer.dhuhr }}<br /><br />
          İKİNDİ:{{ prayer.asr }}<br /><br />
          AKŞAM:{{ prayer.maghrib }}<br /><br />
          YATSI:{{ prayer.isha }}<br /><br />
        </p>
      </b-card-text>
      <template #footer>
        <em>© T.C. Cumhurbaşkanlığı Diyanet İşleri Başkanlığı</em>
      </template>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardText,
  BLink,
  BForm,
  BFormGroup,
  BFormSelect,
  BCol,
  BRow,
} from "bootstrap-vue";
import axios from "axios";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BForm,
    BFormGroup,
    BFormSelect,
    BCol,
    BRow,
  },
  data() {
    return {
      form: {
        City: null,
      },

      city: [
        { value: "İSTANBUL", text: "İSTANBUL" },
        { value: "ANKARA", text: "ANKARA" },
        { value: "SAMSUN", text: "SAMSUN" },
        { value: "BURSA", text: "BURSA" },
      ],

      havaDurumu: null,
      prayer: null,
    };
  },
  methods: {
    getHavaDurumu() {
      axios
        .post(
          "https://localhost:44317/Api/PublicWidget/GetWeather",
          { City: [this.form.City] },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log(response);
          this.havaDurumu = response.data;
        });
    },
    getPrayerTime() {
      axios
        .post(
          "https://localhost:44317/Api/PublicWidget/GetPrayerTime",
          { Latitude: 41, Longitude: 28, date: "2021-09-15" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log(response);
          this.prayer = response.data;
        });
    },
  },
  mounted() {
    this.getPrayerTime();
  },
};
</script>

<style>
</style>
