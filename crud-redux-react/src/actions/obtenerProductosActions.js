import {
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR
} from '../types';
import ClienteAxios from '../config/axios';

//obtener listado de productos( consultar API )
export function obtenerProductosActions(){
    return (dispatch) => {
        dispatch(comenzarDescargaProductos());
        //consultando a la api
        ClienteAxios.get('/libros')
        .then(respuesta => {
            //console.log(respuesta);
            dispatch(descargaProductosExitosa(respuesta.data));
        })
        .catch(error => {
            //console.log(error);
            dispatch(descargaProductosError());
        })
    }
}
export const comenzarDescargaProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS
})
export const descargaProductosExitosa = productos =>({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
})
export const descargaProductosError = () =>({
    type: DESCARGA_PRODUCTOS_ERROR,
})