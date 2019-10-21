import {
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR
} from '../types';
import ClienteAxios from '../config/axios';

//funcion que elimina un producto en especifico

export function borrarProductoAction (id) {
    return (dispatch) =>{
        dispatch(obtenerProductoEliminar());
        //Eliminar en la API
        ClienteAxios.delete(`/libros/${id}`)
        .then(respuesta=> {
            //console.log(respuesta);
            dispatch(productoEliminarExito(id));
        })
        .catch(error=> {
           // console.log(error);
            dispatch(productoEliminarError());
        })
    }
}
export const obtenerProductoEliminar = () =>({
    type: OBTENER_PRODUCTO_ELIMINAR
})
export const productoEliminarExito = id =>({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})
export const productoEliminarError = () =>({
    type: PRODUCTO_ELIMINADO_ERROR,
})