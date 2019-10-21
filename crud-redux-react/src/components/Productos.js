import React, { useEffect } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosActions } from '../actions/obtenerProductosActions';
import Producto from './Producto';
import Spinner from './Spinner';

const Productos = () => {
    // Mandar llamar a la acción principal para retornar los productos
    const dispatch = useDispatch();
    useEffect(
        () => {
            //productos cuando el componente este listo
            const cargarProductos = () => dispatch(obtenerProductosActions());
            cargarProductos();
        }, [dispatch]
    );
    //Acceder al state
    const loading = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const productos = useSelector(state => state.productos.productos);

    const componente = (loading) ? <Spinner></Spinner>:null;
    return (
        <React.Fragment>
            {error
                ?<div className="font-weight-bold alert alert-danger text-center mt-4">
                    Hubo un error..
                </div>:null }

                    <h2 className="text-center my-5">Listado de Productos</h2>
                    <table className="table table-striped">
                        <thead className="bg-primary table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(producto =>(
                                <Producto
                                    key={producto.id}
                                    producto={producto}
                                ></Producto>
                            )) }
                        </tbody>
                    </table>
                  
                    {componente}
        </React.Fragment>
    );
};

export default Productos;