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
        v-b-toggle.products
        variant="primary"
      >
        Ürün Ekle
      </b-button>
      </b-input-group>
     
    </div>
    <div class="row">
        <div v-for="item in filteredList" :key="item.id" class="col-md-3 col-6 my-1">
            <div class="card h-100">
              <div class="card-title">{{item.supplierName}}</div>
              
              <img v-if="item.image != null" alt="corpLogo" :src="require(`@/assets/images/productsImg/${item.image}`)" error="@/assets/images/productsImg/imagenull.jpg" />
              <img v-else :src="require(`@/assets/images/productsImg/imagenull.jpg`)"/>
                <div class="card-body">
                    <div class="card-title">{{ item.name }}</div>
                    <div class="card-text">{{ item.groupName }}</div>     
                    <div class="card-text">{{ item.property }}</div>
                    <div>
                        <span class="badge badge-pill badge-info">{{ item.price }}₺</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
          <b-sidebar
        id="products"
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
import { BButton, BSidebar, VBToggle, BCardText, BTable,BCardGroup,BImg,BInputGroup,BInputGroupPrepend,BFormInput} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import SidebarContent from "./product-sidebar/SidebarContent.vue";
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
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
  },
  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },

  data() {
    return {   
      Products: [],
      searchWord:""
    };
  },

  methods: {
    getProducts() {
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
  computed: {
    filteredList() {
      return this.Products.filter(post => {
        return post.name?.toLowerCase().includes(this.searchWord.toLowerCase())
      })
    }
  }
};
</script>
