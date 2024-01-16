<template>
  <div class="container" id="app">
    <div style="width: 50%">
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <feather-icon icon="SearchIcon" />
        </b-input-group-prepend>
        <b-form-input
        class="mr-2"
          type="text"
          placeholder="Search"
          v-model="searchWord"
          
        />
        <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-toggle.stock
        variant="primary"
      >
        Stoğa Ürün Ekle
      </b-button>
      </b-input-group>
    </div>
    <div class="row">
      <div v-for="item in filteredList" :key="item.id" class="col-md-3 col-6 my-1">
        <div class="card h-100">
          
          <img alt="corpLogo" :src="require(`@/assets/images/productsImg/${item.productimg}`)" />

          <div class="card-body">
            <div class="card-title">{{ item.productName }}</div>
            <div class="card-text">
              {{ item.supplierName }} <br />{{ item.departmentName }}
            </div>
            <vue-numeric-input
              v-model="item.value"
              :min="0"
              :max="500"
              :step="1"
            ></vue-numeric-input>
            <div>
              <span class="badge badge-pill badge-info">{{ item.price }}₺</span>
            </div>
            <div v-if="item.status == true">
              <b-badge variant="success">Stokta Var</b-badge>
            </div>
            <div v-else>
              <b-badge variant="danger">Stokta Yok</b-badge>
            </div>
          </div>
          <div></div>
          <b-button
            v-on:click="
              deleteStock(
                item.id,
                item.supplierId,
                item.departmentId,
                item.productId,
                item.value
              )
            "
            variant="danger"
            >ÇIKAR</b-button
          >
          <b-button
            v-on:click="
              addStock(
                item.id,
                item.supplierId,
                item.departmentId,
                item.productId,
                item.value
              )
            "
            variant="success"
            >EKLE</b-button
          >
        </div>
      </div>
    </div>
    <b-sidebar
        id="stock"
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
</template>
<script>
import BCardCode from "@core/components/b-card-code";
import {
  BButton,
  BSidebar,
  VBToggle,
  BCardText,
  BTable,
  BCardGroup,
  BImg,
  BBadge,
  BInputGroup,
  BInputGroupPrepend,
  BFormInput
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import SidebarContent from "./stock-sidebar/SidebarContent.vue";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from "axios";
export default {
  components: {
    BImg,
    BCardCode,
    BCardGroup,
    BButton,
    BSidebar,
    SidebarContent,
    BCardText,
    BTable,
    BBadge,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    ToastificationContent
  },
  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },

  data() {
    return {
      Stock: [],
      searchWord:"",

    };
  },

  methods: {
    getStock() {
      axios
        .get(
          "https://localhost:44317/Api/Stock/all",
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
          this.Stock = response.data;
        });
    },
    deleteStock(id, supplierId, departmentId, productId, total) {
      axios
        .put("https://localhost:44317/Api/Stock/sale", {
            id: id,
            supplierId: supplierId,
            departmentId: departmentId,
            productId: productId,
            total: total,
          }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          
        })
        .then((result) => {
           if(result.data.status == false)
           {
             this.$toast({
        component: ToastificationContent,
        props: {
          title: 'STOK YETERSİZ',
          icon: 'BellIcon',
          text: 'Stokta yeterli ürün yok.',
          variant:"warning"
        },
      })
           }
           else{
             this.$toast({
        component: ToastificationContent,
        props: {
          title: 'STOĞA ÜRÜN EKLENDİ',
          icon: 'BellIcon',
          text: 'Ürün stoğa başarıyla eklendi.',
          variant:"success"
        },
      })
           }
          this.getStock();
        });
    },
    addStock(id, supplierId, departmentId, productId, total) {
      axios
        .put("https://localhost:44317/Api/Stock/add", {
            id: id,
            supplierId: supplierId,
            departmentId: departmentId,
            productId: productId,
            total: total,
          }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          
        })
        .then((result) => {
          this.getStock();
        });
    },
  },
  mounted() {
    this.getStock();
  },
    computed: {
    filteredList() {
      return this.Stock.filter(post => {
        return post.productName?.toLowerCase().includes(this.searchWord.toLowerCase())
      })
    }
  }
  
};
</script>
