<template>
  <v-app>      
    
    <Vista />
   
      <v-footer padless>
    <v-col
      class="text-right"
      cols="12"
    >
      VERSION - {{version}} — <strong>Gapsi</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>


<script>
import Vista from "@/views/layout/Vista.vue";
import { GET_USUARIO } from "@/store/auth.module";

export default {
  name: "Layout",

  components: {        
    Vista,
  },
  data: () => ({
    version:"1.0",
    log:false,
  }),
  
   mounted() {   
     this.$store.dispatch(GET_USUARIO).then(( response    
     )=>{ 
      console.log(response)
      this.version=response.datos[0].version;
    });
   }

};
</script>