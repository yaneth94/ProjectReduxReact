import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';

class MostrarLibro extends Component {
    devolverLibro = id => {
        //extraer firestores
        const {firestore,history } = this.props;
        //copia del libro
        const libroActualizado = {...this.props.libro};
        //eliminar la persona que esta realizando la devolución de prestados
        const prestados = libroActualizado.prestados.filter(prestado=> prestado.codigo !== id);
        libroActualizado.prestados = prestados;
        //actualizar en firebase
        firestore.update({
            collection:'libros',
            doc: libroActualizado.id
        },libroActualizado).then(history.push(`/libros/mostrar/${libroActualizado.id}`))
    }
    render() {
        //extraer el libro
        const { libro } = this.props;
        if (!libro) return <Spinner></Spinner>
        //boton para solicitar un libro
        let btnPrestamo;
        if (libro.existencia - libro.prestados.length > 0) {
            btnPrestamo = <Link
                to={`/libros/prestamo/${libro.id}`}
                className="btn btn-success my-3">Solicitar Prestamo</Link>
        } else {
            btnPrestamo = null;
        }
        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fa fa-arrow-circle-left"></i>{' '}
                        Volver al listado
            </Link>
                </div>
                <div className="col-md-6">
                    <Link to={`/libros/editar/${libro.id}`} className="btn btn-primary float-right">
                        <i className="fa fa-pencil"></i>{' '}
                        Editar Libro
            </Link>
                </div>
                <hr className="mx-5 w-100" />
                <div className="col-12">
                    <h2 className="mb-4">
                        {libro.titulo}
                    </h2>
                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span> {' '}
                        {libro.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Editorial:
                        </span> {' '}
                        {libro.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Existencias:
                        </span> {' '}
                        {libro.existencia}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Disponibles:
                        </span> {' '}
                        {libro.existencia - libro.prestados.length}
                    </p>
                    {/** boton para solicita prestamo de libro */}
                    {btnPrestamo}
                    {/**Muestra las personas que tienen los libros */}
                    <h3 className="my-2">Personas que tienen el Libro Prestado</h3>
                    {libro.prestados.map(prestado => (
                        <div key={prestado.codigo} className="card my-2">
                            <h4 className="card-header">
                                {prestado.nombre} {prestado.apellido}
                            </h4>
                            <div className="card-body">
                                <p>
                                    <span className="font-weight-bold">
                                        Código:
                                    </span> {' '}
                                    {prestado.codigo}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Carrera:
                                    </span> {' '}
                                    {prestado.carrera}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Fecha de Solicitud:
                                    </span> {' '}
                                    {prestado.fecha_solicitud}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button type="button" className="btn btn-success font-weight-bold" onClick={() => this.devolverLibro(prestado.codigo)}>
                                    Realizar Devolución
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
MostrarLibro.propTypes = {
    firestore: PropTypes.object.isRequired,
}


export default compose(
    firestoreConnect(props => [
        {
            collection: 'libros',
            storeAs: 'libro',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
)(MostrarLibro);