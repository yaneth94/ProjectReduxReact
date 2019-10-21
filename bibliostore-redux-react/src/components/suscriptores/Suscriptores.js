import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Suscriptor from './Suscriptor';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';

const Suscriptores = () => {
    useFirestoreConnect('suscriptores')
    const suscriptores = useSelector(state => state.firestore.ordered.suscriptores);
    if (!suscriptores) return <Spinner></Spinner>
    //console.log(suscriptores);
    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link
                    to={'/suscriptores/nuevo'}
                    className="btn btn-primary"
                >
                    <i className="fa fa-plus"></i> {' '}
                    Nuevo Suscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fa fa-users"></i> Suscriptores
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {suscriptores.map(suscriptor => (
                        <Suscriptor
                            key={suscriptor.id}
                            suscriptor={suscriptor}
                        ></Suscriptor>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Suscriptores;