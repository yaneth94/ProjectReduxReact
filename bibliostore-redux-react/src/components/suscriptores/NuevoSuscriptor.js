import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import Swal from 'sweetalert2';

const NuevoSuscriptor = ({ history }) => {
    const [nombre, guardarNombre] = useState('');
    const [apellido, guardarApellido] = useState('');
    const [carrera, guardarCarrera] = useState('');
    const [codigo, guardarCodigo] = useState('');
    //extraer firestore
    const firestore = useFirestore();

    const submitNuevoSuscriptor = e => {
        e.preventDefault();
        if (nombre.trim() === '' || apellido.trim() === '' || carrera.trim() === '' || codigo.trim() === '') {
           
            return;
        }
        const nuevoSuscriptor = {
            nombre,
            apellido,
            carrera,
            codigo
        }
        //Mensaje de Error
       
        //Agrega un nuevo suscriptor a la base de datos
        //guardarlo en la base de datos
        firestore.add({
            collection: 'suscriptores',
        }, nuevoSuscriptor)
            .then(() => {
                Swal.fire(
                    'Ingresado!',
                    'Ha ingresado un nuevo suscriptor.',
                    'success'
                )
                history.push('/suscriptores')
            })

    }
    return (
        <div className="row mb-5">
            <div className="col-12 mb-4">
                <Link to={'/suscriptores'} className="btn btn-secondary">
                    <i className="fa fa-arrow-circle-left"></i>{' '}
                    Volver al listado
                </Link>
            </div>
            <div className="col-12">
                <h2>
                    <i className="fa fa-user-plus"></i>{' '}
                    Nuevo Suscriptor
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={submitNuevoSuscriptor}>
                            <div className="form-group">
                                <label >Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Nombre del Suscriptor"
                                    required
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label >Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="apellido"
                                    placeholder="Apellido del Suscriptor"
                                    required
                                    onChange={e => guardarApellido(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label >Carrera</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="carrera"
                                    placeholder="Carrera del Suscriptor"
                                    required
                                    onChange={e => guardarCarrera(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label >Carrera</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="codigo"
                                    placeholder="Codigo del Suscriptor"
                                    required
                                    onChange={e => guardarCodigo(e.target.value)}
                                />
                            </div>
                            <input type="submit" value="Agregar Subscriptor" className="btn btn-success" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoSuscriptor;