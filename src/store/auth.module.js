import ApiService from "./services/api.service";

// Acciones
/**
 * Obtener la informacion del candidato
 */
export const GET_USUARIO = "getusuario";
/**
 * Obtener la lista de provedores
 */
export const GET_PROVEDOR = "getprovedor";
/**
 * elimina registro
 */
export const REMOVE_PROVEDOR = "removeprovedor";
/**
 * Agrega registro
 */
 export const ADD_PROVEDOR = "addprovedor";

// Mutaciones

export const SET_USUARIO = "setUser";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  username:"",
  version:"",
};

const getters = {
  currentUser(state) {    
    return state.username;
  },
  currentVersion(state) {    
    return state.version;
  },

};

const actions = {


  [GET_USUARIO](context) {  
    return new Promise(resolve => {       
      ApiService.get("/usuarios/1")
        .then(({ data }) => {
          
          context.commit(SET_USUARIO, data.datos);
         resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });

      });
    
  },
  [GET_PROVEDOR](context, credentials) {

    return new Promise(resolve => {                      

      ApiService.get("/proveedores")

        .then(({ data }) => {          
          
          resolve(data);

        })

        .catch(({ response }) => {

          context.commit(SET_ERROR, response.data.mensaje);

        });

    });

  },

  [REMOVE_PROVEDOR](context, credentials) {

    return new Promise(resolve => {                      

      ApiService.get("/proveedores/"+credentials.nombre)

        .then(({ data }) => {          
                    
          resolve(data);

        })

        .catch(({ response }) => {

          context.commit(SET_ERROR, response.data.mensaje);

        });

    });

  },
  [ADD_PROVEDOR](context, credentials) {

    return new Promise(resolve => {                      
      ApiService.get("/proveedores/agrega/"+credentials.nombre+"/rfc/"+credentials.rfc+"/direccion/"+credentials.direccion)
        .then(({ data }) => {                              
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.mensaje);
        });

    });

  },
  
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_USUARIO](state, user) {             
    state.username=user[0].username
    state.version=user[0].version
    state.errors = {};    
  },
 
};

export default {
  state,
  actions,
  mutations,
  getters
};
