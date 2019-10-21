import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import Swal from 'sweetalert2';

class NuevoLibro extends Component {
    state = {
        titulo: '',
        ISBN: '',
        editorial: '',
        existencia: ''
    }
    //almacena lo que el usuario escribe en el state
    LeerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //guardar e libro en la base de datos
    submitNuevoLibro = e => {
        e.preventDefault();
        //tomar una copia del state
        const nuevoLibro = this.state;
        //agregar un arreglo de prestados
        nuevoLibro.prestados =[];
        //extraer firestore con sus metodos
        const { firestore,history } = this.props;
        //añadirlo a la base de datos y direccionar
        firestore.add({collection: 'libros'},nuevoLibro)
        .then(() => {
            Swal.fire(
                'Ingresado!',
                'Ha ingresado un nuevo suscriptor.',
                'success'
            )
            history.push('/')
        })
    }
    render() {
        return (
            <div className="row mb-5">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fa fa-arrow-circle-left"></i>{' '}
                        Volver al listado
                </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fa fa-book"></i>{' '}
                        Nuevo Libro
                </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.submitNuevoLibro}>
                                <div className="form-group">
                                    <label >Titulo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo del Libro"
                                        required
                                        value={this.state.titulo}
                                        onChange={this.LeerDato}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >ISBN</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ISBN"
                                        placeholder="ISBN del libro"
                                        required
                                        value={this.state.ISBN}
                                        onChange={this.LeerDato}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Editorial</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Editorial del Libro"
                                        required
                                        value={this.state.editorial}
                                        onChange={this.LeerDato}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Existencias</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Existencia del libro"
                                        required
                                        value={this.state.existencia}
                                        onChange={this.LeerDato}
                                    />
                                </div>
                                <input type="submit" value="Agregar Libro" className="btn btn-success" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
NuevoLibro.propTypes ={ 
    firestore: PropTypes.object.isRequired,
}

export default firestoreConnect()(NuevoLibro);