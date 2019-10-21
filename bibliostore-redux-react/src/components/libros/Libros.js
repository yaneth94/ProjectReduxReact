import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Libro from './Libro';
import Spinner from '../Layout/Spinner';

const Libros = ({libros}) => {
    if(!libros) return <Spinner></Spinner>
    return (
       <div className="row">
           <div className="col-12 mb-4">
               <Link
                to={'/libros/nuevo'}
                className="btn btn-success"
               >
                   <i className="fa fa-plus"></i> {' '}
                   Nuevo Libro
               </Link>
           </div>
           <div className="col-md-8">
               <h2>
                   <i className="fa fa-book"></i> {' '}
                   Libros
               </h2>
           </div>
           <table className="table table-striped mt-4">
               <thead className="text-light bg-primary">
                   <tr>
                       <th>Titulo</th>
                       <th>ISBN</th>
                       <th>Editorial</th>
                       <th>Existencia</th>
                       <th>Disponibles</th>
                       <th>Acciones</th>
                   </tr>
               </thead>
               <tbody>
                   {libros.map(libro=>(
                       <Libro
                        key={libro.id}
                        libro={libro}
                       ></Libro>
                   ))}
               </tbody>
           </table>
       </div>
    );
};


export default compose (
    firestoreConnect([{collection : 'libros'}]),
    connect((state,props)=>({
        libros: state.firestore.ordered.libros
    }))
)(Libros);
