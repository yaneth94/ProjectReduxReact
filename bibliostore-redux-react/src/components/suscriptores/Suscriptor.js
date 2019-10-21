import React from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const Suscriptor = ({suscriptor}) => {
    //se trae las instancias de funciones para poder eliminar, crear, editar 
    const firestore = useFirestore()
    //console.log(firestore);
    //eliminar suscriptores
   const eliminarSuscriptor = id => {
    Swal.fire({
        title: 'Esta seguro de Eliminar el suscriptor?',
        text: "Este registro no podra recuperarse!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Eliminar!',
            'Suscriptor Eliminado permanentemente.',
            'success'
          )
          firestore.delete({
            collection: 'suscriptores',
            doc: id
        });
        }
      })
       
    }
    return (
        <tr>
            <td>{suscriptor.nombre} {suscriptor.apellido}</td>
            <td>{suscriptor.carrera}</td>
            <td>
                <Link 
                    to={`/suscriptores/mostrar/${suscriptor.id}`} 
                    className="btn btn-success btn-block"
                >
                    <i className="fa fa-angle-double-right"></i> {' '}
                    Más Información
                </Link>
                <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={() => eliminarSuscriptor(suscriptor.id)}
                >
                    <i className="fa fa-trash"></i> {' '}
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

Suscriptor.propTypes ={
    suscriptor: PropTypes.object.isRequired,
}

export default Suscriptor;