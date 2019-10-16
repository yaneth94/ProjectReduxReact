import { createStore } from 'redux';
import reducer from './reducers';
import { obtenerStorage,guardarStateStorage } from './localStorage';
//Definir state inicial
//const initialState = [];

//obtener citas del localStorage
const storageState = obtenerStorage();

export const store = createStore(
    reducer,
    storageState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//esto es detectar los cambios acceder  a los cambios
store.subscribe( () => {
    guardarStateStorage({
        citas: store.getState().citas
    })
})

export default store;