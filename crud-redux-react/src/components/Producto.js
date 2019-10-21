import React from 'react';
import { Link } from 'react-router-dom';
//Alert
import  Swal from 'sweetalert2';
//Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction } from '../actions/eliminarProductosActions'

const Producto = ({producto}) => {

    //Dispatch para ejecutar las acciones
    const dispatch = useDispatch();
    const confirmarEliminarProducto = id => {

        //Confirmación de Sweet Alert
        //Preguntar al usuario
        Swal.fire({
            title: '¿Esta seguro de Eliminar?',
            text: "Si elimina no podra recuperar el registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminarlo!',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Eliminado!',
                'Tu producto ha sido Eliminado.',
                'success'
              )
              dispatch(borrarProductoAction(id));
            }
          })
        console.log(id);
        
    }
    return (
        <tr>
            <td>{producto.nombre}</td>
            <td><span className="font-weight-bold badge badge-info" >${producto.precio}</span></td>
            <td className="acciones">
                <Link to={`/productos/editar/${producto.id}`} className="btn btn-primary mr-2">
                    Editar
                </Link>
                <button className="btn btn-danger" onClick={() => confirmarEliminarProducto(producto.id)}>Eliminar</button>
            </td>
        </tr>
    );
};

export default Producto;