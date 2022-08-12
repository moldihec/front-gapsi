<template>
  <v-card class="elevation-0" style="height: 100%">
    <v-app-bar absolute color="white" elevate-on-scroll>
      <v-toolbar-title>e-Commerce Gapsi</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="150"
        max-width="150"
        src="../assets/logo.png"
      ></v-img>
      <v-btn icon aria-label="Right Align">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container id="user-profile-view" style="padding-top: 144px">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <appcard class="mt-4 text-center">
            <v-img
              class="rounded-circle elevation-6 mt-n12 d-inline-block"
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
              width="128"
            />

            <v-card-text class="text-center">
              <h6 class="text-h6 mb-2 text--secondary">Bienvenido</h6>

              <h4 class="text-h4 mb-3 text--primary">{{ nombre }}</h4>

              <p class="text--secondary"></p>

              <v-btn
                class="ma-2"
                dark
                aria-label="Center Align"
                color="primary"
                min-width="100"
                @click="onSubmit"
              >
                Continuar
                <v-icon right dark>mdi-chevron-double-right</v-icon>
                <v-progress-circular
                  indeterminate
                  color="white"
                  v-show="log"
                ></v-progress-circular>
              </v-btn>
            </v-card-text>
          </appcard>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
// Utilities
import materialcard from "@/components/MaterialCard.vue";
import appcard from "@/components/app/Card.vue";
import { GET_USUARIO } from "@/store/auth.module";

export default {
  name: "DashboardView",

  components: {
    appcard,
    materialcard,
  },

  computed: {},
  data: () => ({
    nombre: "Candidato",
    log: false,
  }),
  methods: {
    onSubmit() {
      this.log = true;
      this.$router.push({ name: "proveedores" });
    },
  },

  mounted() {
    this.$store.dispatch(GET_USUARIO).then((response) => {
      this.nombre = response.datos[0].username;
    });
  },
};
</script>