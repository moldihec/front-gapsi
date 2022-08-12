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

    <v-container
      id="dashboard-view"
      fluid
      tag="section"
      style="padding-top: 80px"
    >
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn
            class="ma-2"
            aria-label="Right Align"
            dark
            color="green"
            @click="altaUsuario()"
            >Agregar
            <v-icon right dark>mdi-account-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <materialcard color="orange" icon="mdi-account-multiple-outline">
            <template #title>
              Lista proveedores <small class="text-body-1"></small>
            </template>
            <v-card-text>
              <v-data-table :headers="headers" :items="items">
                <template v-slot:item.accion="{ item }">
                  <div>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          v-on="on"
                          color="red"
                          @click="eliminaUsuario(item)"
                          >mdi-delete</v-icon
                        >
                      </template>
                      <span>Eliminar</span>
                    </v-tooltip>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </materialcard>
          <v-dialog v-model="dialog" width="700" color="gray">
            <v-toolbar>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" @click="dialog = false">
                <v-icon color="white">mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-toolbar>

            <materialcard
              color="primary"
              icon="mdi-account-outline"
              style="margin-top: 2px !important"
            >
              <template #title>
                Agregar proveedor —
                <small class="text-body-1">Completa los datos</small>
              </template>

              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label="Nombre:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.nombre"
                    required
                    placeholder="Ingresa el nombre"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  label="Rfc:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.rfc"
                    required
                    placeholder="Ingresa el rfc"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-3"
                  label="Direccion:"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    v-model="form.direccion"
                    required
                    placeholder="Ingresa la direccion"
                  ></b-form-input>
                </b-form-group>
                <materialalert
                  v-model="snackbar"
                  color="orange"
                  dark
                  dismissible
                  icon="mdi-alert"
                >
                  {{ text }}
                </materialalert>
                <b-button type="submit" variant="primary">Agregar</b-button>
                <b-button type="reset" variant="danger">Limpiar</b-button>
              </b-form>
            </materialcard>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import materialcard from "@/components/MaterialCard.vue";
import materialalert from "@/components/MaterialAlert.vue";
import {
  GET_PROVEDOR,
  REMOVE_PROVEDOR,
  ADD_PROVEDOR,
} from "@/store/auth.module";

export default {
  components: {
    materialcard,
    materialalert,
  },
  data: () => ({
    form: {
      nombre: "",
      rfc: "",
      direccion: "",
    },
    show: true,
    dialog: false,

    headers: [
      {
        sortable: false,
        text: "Nombre",
        value: "nombre",
      },
      {
        sortable: false,
        text: "Razón social",
        value: "rfc",
        align: "right",
      },
      {
        sortable: false,
        text: "Dirección",
        value: "direccion",
        align: "right",
      },
      {
        sortable: false,
        text: "Acción",
        value: "accion",
        align: "right",
      },
    ],
    items: [],
    snackbar: false,
    text: "",
  }),
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.agregarUsuario();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.nombre = "";
      this.form.rfc = "";
      this.form.direccion = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    /**
     * Metodo para mostrar formulario para la alta de los usuarios.
     */
    altaUsuario() {
      this.form.nombre = "";
      this.form.rfc = "";
      this.form.direccion = "";
      this.dialog = true;
    },
    /**
     * Metodo para agregar nuevo usuario
     */
    agregarUsuario() {
      let bandera = true;
      var vsubtotal = 0;
      let itemsDet = {
        nombre: this.form.nombre,
        rfc: this.form.rfc,
        direccion: this.form.direccion,
      };
      if (this.form.nombre == "") {
        this.text = "Es necesario llenar el campo de nombre";
        this.snackbar = true;
        bandera = false;
      } else if (this.form.rfc == "") {
        this.text = "Es necesario llenar el campo de rfc";
        this.snackbar = true;
        bandera = false;
      } else if (this.form.direccion == "") {
        this.text = "Es necesario llenar el campo de direccion";
        this.snackbar = true;
        bandera = false;
      }

      this.items.forEach((el, index) => {
        if (el.nombre === this.form.nombre) {
          bandera = false;
          this.text = "El provedor ya se encuentra registrado.";
          this.snackbar = true;
        }
      });

      if (bandera) {
        this.items.push(itemsDet);
        this.cantidad = 0;
        this.punit = "";
        this.unidad = "";
        this.descripcion = "";
        this.tentregaitem = 0;

        this.$store
          .dispatch(ADD_PROVEDOR, {
            nombre: itemsDet.nombre,
            rfc: itemsDet.rfc,
            direccion: itemsDet.direccion,
          })
          .then((response) => {
            console.log(response);
            this.dialog = false;
          });
      }
    },
    /**
     * Metodo para borrar un usuario
     */
    eliminaUsuario(item) {
      const index = this.items.indexOf(item);
      confirm("¿Estas seguro de borrar el elemento?") &&
        this.items.splice(index, 1);
      this.$store
        .dispatch(REMOVE_PROVEDOR, { nombre: item.nombre })
        .then((response) => {
          console.log(response);
        });
    },
  },
  /**
   * Cuando se renderiza la pagina invoca el API Rest para llenar la tabla de proveedores.
   */
  mounted() {
    this.$store.dispatch(GET_PROVEDOR).then((response) => {
      this.items = response;
    });
  },
};
</script>
