<template>
  <div
    class="
      sidebar-wrapper
      d-flex
      justify-content-between
      flex-column flex-grow-1
    "
  >
    <div class="mt-3">
      <b-card-code title="Aktivite Ekle">
        <b-form @submit.prevent>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Başlık" label-for="Title">
                <b-form-input v-model="form.title" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                label="Etkinlik Başlangıç Tarihi"
                label-for="started"
              >
               <!--<b-form-input v-model="form.startedDate" type="date" />-->
                <b-form-datepicker id="example-datepicker" v-model="form.startedDate" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Etkinlik Bitiş Tarihi" label-for="ended">
                <!--<b-form-input v-model="form.endedDate" type="date" />-->
                <b-form-datepicker id="example-datepicker" v-model="form.endedDate" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tekrarla" label-for="Title">
                <b-form-select v-model="form.repeat" :options="repeat" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Etkinlik Rengi" label-for="Color">
                <b-form-select v-model="form.color" :options="color" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Etkinlik Görünürlüğü" label-for="Visibility">
                <b-form-select
                  v-model="form.visibility"
                  :options="visibility"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Etkinlik Konumu" label-for="Konum">
                <b-form-input v-model="form.location" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Etkinlik Bağlantısı" label-for="Url">
                <b-form-input v-model="form.url" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Açıklama" label-for="Acıklama">
                <b-form-textarea
                  v-model="form.statement"
                  id="textarea-auto-height"
                  placeholder="Auto height textarea"
                  rows="3"
                  max-rows="8"
                ></b-form-textarea>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Etkinlik Görseli:" label-for="Image">
                <b-form-file
                  v-model="image"
                  ref="file-input"
                  class="mb-2"
                ></b-form-file>

                <div class="mt-3">
                  Seçilen Görsel: {{ image ? image.name : "" }}
                </div>
                <b-button variant="danger" @click="image = null"
                  >Görsel Sil</b-button
                >
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                v-on:click="updateActivities()"
              >
                ETKİNLİK GÜNCELLE
              </b-button>
            </b-col>
          </b-row>
        </b-form>

        <template #code>
          {{ codeVertical }}
        </template>
      </b-card-code>
    </div>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormSelect,
  BFormTextarea,
  BFormFile,
  BFormDatepicker,
  VBToggle,
  BCollapse,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { codeVertical } from "./code";
import axios from "axios";

export default {
  components: {
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormSelect,
    BFormTextarea,
    BFormFile,
    BFormDatepicker,
    BCollapse,

  },
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },
  data() {
    return {
      form: {
        title: "",
        startedDate: "",
        endedDate: "",
        repeat: "",
        color: "",
        Visibility: 1,
        location: "",
        url: "",
        statement: "",
      },
      codeVertical,
      image: null,
      City: "",
      Repeat: "",
      repeat: [
        { value: "true", text: "Hayır" },
        { value: "false", text: "Evet" },
      ],
      Color: "",
      color: [
        { value: "#000EFF", text: "Mavi" },
        { value: "#FF0000", text: "Kırmızı" },
        { value: "#FFFF00", text: "Sarı" },
        { value: "#1FB813", text: "Yeşil" },
      ],
      Visibility: "",
      visibility: [
        { value: 1, text: "Admin" },
        { value: 2, text: "Personel" },
        { value: 3, text: "Görevli" },
        { value: 4, text: "Organizatör" },
      ],
    };
  },
  async mounted() {
    const result = await axios.get(
      "https://localhost:44317/Api/Activities?id=" + this.$route.params.id
    );
    this.form = result.data
    console.warn(result.data)
  },
  methods: {
    clearFiles() {
      this.$refs["image"].reset();
    },
    updateActivities() {
      console.warn("güncellendi");
      axios
        .put(
          "https://localhost:44317/Api/Activities",this.form,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then(function (response) {}.bind(this));
    },
  },
};
</script>
