import React from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const Libro = ({ libro }) => {
    //se trae las instancias de funciones para poder eliminar, crear, editar 
    const firestore = useFirestore()

    const eliminarLibro = id => {
        Swal.fire({
            title: 'Esta seguro de Eliminar el libro?',
            text: "Este registro no podra recuperarse!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Eliminado!',
                    'Libro eliminado correctamente.',
                    'success'
                )
                firestore.delete({
                    collection: 'libros',
                    doc: id
                });
            }
        })

    }
    return (
        <tr>
            <td>{libro.titulo}</td>
            <td>{libro.ISBN}</td>
            <td>{libro.editorial}</td>
            <td>{libro.existencia}</td>
            <td>{libro.existencia - libro.prestados.length}</td>
            <td>
                <Link
                    to={`/libros/mostrar/${libro.id}`}
                    className="btn btn-success btn-block"
                >
                    <i className="fa fa-angle-double-right"></i> {' '}
                    Más Información
                </Link>
                <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => eliminarLibro(libro.id)}
                >
                    <i className="fa fa-trash"></i> {' '}
                    Eliminar
                </button>
            </td>
        </tr>
    );
};
Libro.propTypes = {
    libro: PropTypes.object.isRequired,
}

export default Libro;