import {
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';
import ClienteAxios from '../config/axios';
//Alert
import  Swal from 'sweetalert2';

//obtener el producto a editar
export function obtenerProductoEditarAction (id) {
    return (dispatch) =>{
        dispatch(obtenerProductoEditar());
        //obtener producto de la api
        ClienteAxios.get(`/libros/${id}`)
        .then(respuesta=> {
            console.log(respuesta.data);
            dispatch(obtenerProductoEditarExito(respuesta.data));
        })
        .catch(error=>{
            console.log(error);
            dispatch(obtenerProductoEditarError());
        })
    }
}

export const obtenerProductoEditar = () =>({
    type: OBTENER_PRODUCTO_EDITAR
})
export const obtenerProductoEditarExito = producto =>({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})
export const obtenerProductoEditarError = () =>({
    type: PRODUCTO_EDITAR_ERROR,
})

//modifica un producto en la api y el state
export function editarProductoEditarAction (producto) {
    return (dispatch) =>{
        dispatch(comenzarEdicionProducto());
        //consultar la API
        ClienteAxios.put(`/libros/${producto.id}`,producto)
        .then(respuesta =>{
            //console.log(respuesta);
            dispatch(productoEditadoExito(respuesta.data));
            Swal.fire(
                'Producto Modificado!',
                'Producto Modificado correctamente.',
                'success'
                
              )
        })
        .catch(error => {
            //console.log(error);
            dispatch(productoEditadoError());
        })
    }
}

export const comenzarEdicionProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO
})

export const productoEditadoExito= (producto) =>({
    type: PRODUCTO_EDITADO_EXITO,
    payload:producto
})

export const productoEditadoError = () =>({
    type: PRODUCTO_EDITADO_ERROR
})
