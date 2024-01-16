<template>
  <b-card-code title="Aktiviteler Sayfası">
    <div>
      <br>
      <!--sidebar yandan açılır form butonu-->
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-toggle.activities
        variant="outline-primary"
      >
        Aktivite Ekle
      </b-button>
      <!--sidebar yandan açılır form butonu kapatıldı-->
      <br>
      <div>
        <!--Verilerin tablosu-->
        <b-table striped hover :items="Activities" :fields="fields">
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
                <b-button v-on:click="deleteActivities(sil.item.id)" 
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
          key: "title",
          label: "BAŞLIK",
          sortable: true,
        },
        {
          key: "startedDate",
          label: "BAŞLANGIÇ TARİHİ",
          sortable: true,
        },
        {
          key: "endedDate",
          label: "BİTİŞ TARİHİ",
          sortable: true,
        },
        {
          key: "repeat",
          label: "TEKRARLAMA",
          sortable: false,
        },
        {
          key: "location",
          label: "KONUM",
          sortable: false,
        },
        {
          key: "url",
          label: "BAĞLANTI LİNK",
          sortable: false,
        },
        {
          key: "statement",
          label: "AÇIKLAMA",
          sortable: false,
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
      Activities: [],
    };
  },

  methods: {
    getActivities() {
      axios
        .get(
          "https://localhost:44317/Api/Activities/all",
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
          this.Activities = response.data;
        });
    },
    deleteActivities(id) {
      axios
        .delete(
          "https://localhost:44317/Api/Activities",
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            data:{id:id}
          }).then((result)=>{
          this.getActivities();
        }) 
    },
  },
  mounted() {
    this.getActivities();
  },
};
</script>
