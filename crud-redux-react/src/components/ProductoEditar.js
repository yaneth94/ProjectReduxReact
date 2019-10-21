import React, { useEffect, useRef } from 'react';
//Redux
import { obtenerProductoEditarAction,editarProductoEditarAction } from '../actions/editarProductoActions';
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validacionActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';

const ProductoEditar = ({ match , history}) => {

    //crear los refs
    const nombreRef = useRef('');
    const precioRef = useRef('');

    //Dispatch para ejecutar la acción principal
    const dispatch = useDispatch();
    const editarProducto = (producto) => dispatch(editarProductoEditarAction(producto));
    const validarFormulario = () => dispatch(validarFormularioAction());
    const exitoValidacion = () => dispatch(validacionExito());
    const errorValidacion = () => dispatch(validacionError());
    //obtener el id a editar
    const { id } = match.params;

    useEffect(
        () => {
            const obtenerProductoEditar = () => dispatch(obtenerProductoEditarAction(id));
            obtenerProductoEditar();
        }, [dispatch, id]
    );
    //acceder al state
    const producto = useSelector(state => state.productos.producto);
    const error = useSelector(state => state.productos.error);
    const loading = useSelector(state => state.productos.loading);
    
    //cuando carga la API
    if (!producto) return 'cargando...'

    const submitEditarProducto = e => {
        e.preventDefault();
         //console.log(nombreRef.current.value);
        let producto = {
            id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value
        }
      
        validarFormulario();
        //Validar el formulario
        if(producto.nombre.trim() === '' || producto.precio.trim() === ''){
            errorValidacion();
            return;
        }
        //no hay error
        exitoValidacion();
        //guardar los cambios
        editarProducto(producto);
        //redireccionar
        history.push('/');
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        {error
                            ?
                            <div className="font-weight-bold alert alert-danger text-center mt-4">
                                Hubo un error intente de nuevo</div>
                            :
                            loading ? 
                            <Spinner></Spinner>
                            :
                            <form onSubmit={submitEditarProducto}>
                                <div className="form-group">
                                    <label>Nombre del Producto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Titulo"
                                        defaultValue={producto.nombre}
                                        ref={nombreRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Precio"
                                        defaultValue={producto.precio}
                                        ref={precioRef}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                            </form>
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductoEditar;