<template>
    <div class="container" id="app">
      <div style="width: 50%">
        <b-input-group class="input-group-merge">
          <div style="width: 50%">
        <b-form-select
      v-model="selected"
      :options="options"
      size="sm"
      style="width: 30%"
    />
      </div>
        <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-toggle.products
        variant="primary"
      >
        Departman Ekle
      </b-button>
      </b-input-group>
    </div>
    <div class="row">
        <div v-for="department in filteredList" :key="department.id" class="col-md-3 col-6 my-1">
            <div class="card h-100">
                {{department.image}}
                <img src="@/assets/images/Department.png">
                <div class="card-body">
                    <div class="card-title">{{ department.name }}</div>
                    <div class="card-text">{{ department.address }}</div>
                    <div>
                        <span class="badge badge-pill badge-info">{{ department.phone }}</span>
                        <div v-if="department.status == true">
                        <b-badge variant="success">Açık</b-badge>
                        </div>
                        <div v-else>
                        <b-badge variant="danger">Kapalı</b-badge>
                        </div>
                    </div>
                </div>
                <div class="row mr-4"><b-button :to="'/admin/edit-department/'+department.id" variant="success">DÜZENLE</b-button>
                <b-button v-on:click="deleteDepartment(department.id)" variant="danger">SİL</b-button></div>
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
import { BButton, BSidebar, VBToggle, BCardText, BTable,BBadge,BInputGroup,BFormSelect } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import SidebarContent from "./department-sidebar/SidebarContent.vue";
import axios from "axios";

export default {
  components: {
    BCardCode,
    BButton,
    BSidebar,
    SidebarContent,
    BCardText,
    BTable,
    BBadge,
    BInputGroup,
    BFormSelect
  },
  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },

  data() {
    return {
      Departments: [],
      selected: null,
      options: [
        { value: null, text: 'HEPSİ' },
        { value: true, text: 'AÇIK' },
        { value: false, text: 'KAPALI' }
      ],
    };
  },

  methods: {
    getDepartments() {
      axios
        .get(
          "https://localhost:44317/Api/Department/all",
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
          this.Departments = response.data;
        });
    },
    deleteDepartment(id) {
      axios
        .delete(
          "https://localhost:44317/Api/Department",
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            data:{id:id}
          }).then((result)=>{
          this.getDepartments();
        }) 
    },
  },
  mounted() {
    this.getDepartments();
  },
  computed: {
    filteredList() {
      return this.Departments.filter(post => {
        if(this.selected == null)
        {
          return this.Departments
        }
        return this.selected == post.status
      })
    }
  }
};
</script>
