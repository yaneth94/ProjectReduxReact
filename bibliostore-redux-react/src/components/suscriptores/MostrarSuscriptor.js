import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';

const MostrarSuscriptor = ({ match }) => {
    //declaracion de state local
    const [nombre, guardarNombre] = useState('');
    const [apellido, guardarApellido] = useState('');
    const [carrera, guardarCarrera] = useState('');
    const [codigo, guardarCodigo] = useState('');
    const [loading, guardarLoading] = useState(false);
    //sacando el id de los props
    const id = match.params.id;
    //conexion a la base de firestore para consultar
    useFirestoreConnect(`suscriptores/${id}`)
    const suscriptor = useSelector(state => {
        return state.firestore.ordered.suscriptores && state.firestore.ordered.suscriptores[0]
    });
    useEffect(
        () => {
            const cargarElemento = () => {
                //cargando mientras se descarga la información
                if (!suscriptor) return guardarLoading(true);
                //guardando la información en el state local
                guardarNombre(suscriptor.nombre);
                guardarApellido(suscriptor.apellido);
                guardarCarrera(suscriptor.carrera);
                guardarCodigo(suscriptor.codigo);
                guardarLoading(false);
            }
            cargarElemento();
        }, [suscriptor]
    )

    return (

        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to={'/suscriptores'} className="btn btn-secondary">
                    <i className="fa fa-arrow-circle-left"></i>{' '}
                    Volver al listado
                </Link>
            </div>
            <div className="col-md-6">
                <Link to={`/suscriptores/editar/${id}`} className="btn btn-primary float-right">
                    <i className="fa fa-pencil"></i>{' '}
                    Editar Suscriptor
                </Link>
            </div>
            <hr className="mx-5 w-100" />
            {loading ?
                <Spinner></Spinner>
                :
                <div className="col-12">
                    <h2 className="mb-4">
                        {nombre} {apellido}
                    </h2>
                    <p>
                        <span className="font-weight-bold">
                            Carrera:
                    </span>{' '}
                        {carrera}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Codigo:
                    </span>{' '}
                        {codigo}
                    </p>
                </div>
            }


        </div>
    );
};

export default MostrarSuscriptor;