import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

class EditarSuscriptor extends Component {
    //crear los refs
    nombreRef = React.createRef();
    apellidoRef=React.createRef();
    codigoRef = React.createRef();
    carreraRef= React.createRef();

    
    editarSuscriptor = e => {
        e.preventDefault();
        //crear el objeto que va a actualizar
        const suscriptorActualizado = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            carrera: this.carreraRef.current.value,
            codigo: this.codigoRef.current.value
        }
        //console.log(suscriptorActualizado);
        //extraer firestore y history de props
        const { suscriptor, firestore, history } = this.props;

        //almacenar en la base de datos con firestore
        firestore.update({
            collection: 'suscriptores',
            doc: suscriptor.id
        },suscriptorActualizado).then(() => {
            Swal.fire(
                'Editado!',
                'Ha editado un suscriptor.',
                'success'
            )
            history.push('/suscriptores')
        });

    }
    render() {
        const { suscriptor } = this.props;
        //console.log(suscriptor);
        if (!suscriptor) return <Spinner></Spinner>
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
                        <i className="fa fa-user"></i>{' '}
                        Editar Suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.editarSuscriptor}>
                                <div className="form-group">
                                    <label >Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del Suscriptor"
                                        required
                                        ref={this.nombreRef}
                                        defaultValue={suscriptor.nombre}
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
                                        ref={this.apellidoRef}
                                        defaultValue={suscriptor.apellido}
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
                                        ref={this.carreraRef}
                                        defaultValue={suscriptor.carrera}
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
                                        ref={this.codigoRef}
                                        defaultValue={suscriptor.codigo}
                                    />
                                </div>
                                <input type="submit" value="Editar Subscriptor" className="btn btn-success" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
EditarSuscriptor.propTypes ={
    firestore: PropTypes.object.isRequired,
}
export default compose(
    firestoreConnect(props => [`suscriptores/${props.match.params.id}`]),
    connect((state) => ({
        suscriptor: state.firestore.ordered.suscriptores && state.firestore.ordered.suscriptores[0]
    })
    ))(EditarSuscriptor);

