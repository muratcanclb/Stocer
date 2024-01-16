<template>
  <b-card-code title="Ürünler Sayfası">
    <div>
      <br>
      <!--sidebar yandan açılır form butonu-->
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-toggle.activities
        variant="outline-primary"
      >
        Ürün Ekle
      </b-button>
      <!--sidebar yandan açılır form butonu kapatıldı-->
      <br>
      <div>
        <!--Verilerin tablosu-->
        <b-table striped hover :items="Products" :fields="fields">
          <template #row()="data">
            <span :style="'background-color:' + data.item.color">
              {{ data.item.color }}
            </span>
          </template>
          <!--Template etiketleri ile tabloya butonlar eklenir-->
          <template#cell(edit)="duzenle">
    <b-button :to="'/admin/edit-activities/'+duzenle.item.id" variant="success">DÜZENLE</b-button>
          </template>
          <!--Template etiketleri ile tabloya butonlar eklenir-->
          <!--tabloya butonların fonksiyonları v-on:click ile tanımlanır-->
           <template#cell(delete)="sil">
                <b-button v-on:click="deleteProducts(sil.item.id)" 
        variant="danger"
      >
        SİL
      </b-button>
          </template>

        </b-table>
      </div>
      <b-sidebar
        id="activities"
        sidebar-class="sidebar-lg"
        bg-variant="white"
        shadow
        backdrop
        no-header
        right
        @change="(val) => $emit('update:is-event-handler-sidebar-active', val)"
      >
        <sidebar-content />
      </b-sidebar>
    </div>
  </b-card-code>
</template>
<script>
import BCardCode from "@core/components/b-card-code";
import { BButton, BSidebar, VBToggle, BCardText, BTable } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import SidebarContent from "./calendar-sidebar/SidebarContent.vue";
import axios from "axios";

export default {
  components: {
    BCardCode,
    BButton,
    BSidebar,
    SidebarContent,
    BCardText,
    BTable,
  },
  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },

  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Ürün Adı",
          sortable: true,
        },
        {
          key: "property",
          label: "Özellik",
          sortable: true,
        },
        {
          key: "image",
          label: "Resim",
          sortable: false,
        },
        {
          key: "createdDate",
          label: "Eklenme Tarihi",
          sortable: false,
        },
        {
          key: "price",
          label: "Fiyat",
          sortable: true,
        },
        {
          key: "edit",
          label: "DÜZENLE",
          sortable: false,
        },
        {
          key: "delete",
          label: "SİL",
          sortable: false,
        },
      ],
      Products: [],
    };
  },

  methods: {
    getSale() {
      axios
        .get(
          "https://localhost:44317/Api/Products/all",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.Products = response.data;
        });
    },
    deleteProducts(id) {
      axios
        .delete(
          "https://localhost:44317/Api/Products",
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            data:{id:id}
          }).then((result)=>{
          this.getProducts();
        }) 
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
