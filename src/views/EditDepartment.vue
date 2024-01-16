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
              <b-form-group label="Name" label-for="Name">
                <b-form-input v-model="form.name" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="KAPALI/AÇIK" label-for="status">
                <b-form-checkbox name="check-button" v-model="form.status" switch inline> 
            
                </b-form-checkbox>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Adres" label-for="Adres">
                <b-form-input v-model="form.address" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Telefon" label-for="phone">
                <b-form-input v-model="form.phone" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                v-on:click="updateDepartment()"
                :to="'/Departments'"
              >
                DEPARTMAN GÜNCELLE
              </b-button>
            </b-col>
          </b-row>
        </b-form>
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
        name: "",
        address: "",
        phone: "",
        status: null,
      },
      
    };
  },
  async mounted() {
    const result = await axios.get(
      "https://localhost:44317/Api/Department?id=" + this.$route.params.id
    );
    this.form = result.data
    console.warn(result.data)
  },
  methods: {
    clearFiles() {
      this.$refs["image"].reset();
    },
    updateDepartment() {
        debugger
      console.warn("güncellendi");
      axios
        .put(
          "https://localhost:44317/Api/Department",this.form,
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
