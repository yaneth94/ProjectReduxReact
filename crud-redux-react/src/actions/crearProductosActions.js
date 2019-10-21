import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';
import ClienteAxios from '../config/axios';

//Crear un nuevo producto - Función Principal
export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch( nuevoProducto() );
        //Insertar en la API 
        ClienteAxios.post('/libros',producto)
        .then(respuesta => {
           // console.log(respuesta);
            //Si se inserta correctamente
            dispatch( agregarProductoExito(producto) );
        })
        .catch(error => {
           // console.log(error);
           //si hay un error 
            dispatch( agregarProductoError() );
        })
        
    }
}

export const nuevoProducto = () =>({
    type: AGREGAR_PRODUCTO
})

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload:producto
})

export const agregarProductoError =error => ({
    type: AGREGAR_PRODUCTO_ERROR,
})

