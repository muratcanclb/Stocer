<template>
  <b-card-code title="Satış Sayfası">
    <div>
      <div>
        <!--Verilerin tablosu-->
        <b-table striped hover :items="Sale" :fields="fields">
           <template #cell(toplam)="data">
               <span> {{data.item.total * data.item.price}}</span>
           </template>
        </b-table>
      </div>

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
          key: "orderNo",
          label: "SİPARİŞ NO",
          sortable: true,
        },
        {
          key: "createdDate",
          label: "SATIŞ TARİHİ",
          sortable: true,
        },
        {
          key: "departmentName",
          label: "DEPARTMAN",
          sortable: true,
        },
        {
          key: "productName",
          label: "ÜRÜN ADI",
          sortable: true,
        },
        {
          key: "total",
          label: "ADET",
          sortable: false,
        },
        {
          key: "price",
          label: "FİYAT",
          sortable: false,
        },
        {
          key: "toplam",
          label: "TUTAR",
          sortable: false,
        },
      ],
      Sale: [],
    };
  },

  methods: {
    getSales() {
      axios
        .get(
          "https://localhost:44317/Api/Sale/all",
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
          this.Sale = response.data;
        });
    },
  },
  mounted() {
    this.getSales();
  },
};
</script>
