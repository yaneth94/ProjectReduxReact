import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';
//custom action
import { buscarUsuario } from '../../actions/buscarUsuarioActions';

class PrestamoLibro extends Component {
    state = {
        noResultado: false,
        busqueda : ''
    }
    //buscar alumno por codigo
    buscarAlumno = e => {
        e.preventDefault()
        //obtener el valor a buscar
        const { busqueda } = this.state;
        //extraer firestore
        const { firestore, buscarUsuario } = this.props;
        //hacer la consulta
        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo","==",busqueda).get();
        //leer los resultados+
        consulta.then(resultado => {
            if(resultado.empty){
                //no hay resultados
                //almacenar en redux un objeto vacio
                buscarUsuario({})
                this.setState({
                    noResultado: true
                })
            }else{
                //si hay resultados
                const datos = resultado.docs[0];
                //colocar el resultado enel state de redux
                buscarUsuario(datos.data())
                //actualiza el state en base si hay resultado
                this.setState({
                    noResultado: false
                })
            }
        })
    }
    //buscar almacenar el codigo en el state
    leerDato = e=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //almacena los datos del alumno para solicitar el libro
    solicitarPrestamo = () => {
        const { usuario } = this.props;
        //fecha de alta 
        usuario.fecha_solicitud = new Date().toLocaleDateString();
        //no se puedenmutar los props se debe crear una copia y crear un arreglo nuevo
        let prestados= []; 
        prestados = [...this.props.libro.prestados, usuario];
        //console.log(prestados);
        //Copiar el objeto y agregar los prestados
        const libro = {...this.props.libro};
        //eliminar los prestados anteriores
        delete libro.prestados;
        //asignar los prestads
        libro.prestados = prestados;
        //obtener firestore y history de props
        const { firestore, history } = this.props;
        //almacenar el la BD
        firestore.update({
            collection: 'libros',
            doc: libro.id
        },libro).then(history.push(`/libros/mostrar/${this.props.match.params.id}`))
    }
    render() {
        //extraer el libro
        const { libro } = this.props;
        const{ noResultado } = this.state;
        //mostrar el spinner
        if (!libro) return <Spinner></Spinner>
        //extraer los datos del alumno
        const {  usuario } = this.props;

        let fichaAlumno, btnSolicitar;
        if(usuario.nombre){
            fichaAlumno= <FichaSuscriptor
                           alumno={usuario} ></FichaSuscriptor>
            btnSolicitar = <button type="button" className="btn btn-primary btn-block" onClick={this.solicitarPrestamo}>Solicitar Prestamo</button>
        }else{
            fichaAlumno=null;
            btnSolicitar=null;
        }
        //mostrar mensaje de error
        let mensajeResultado = '';
        if(noResultado){
            mensajeResultado= <div className="alert alert-danger text-center font-weight-bold" >No hay Resultados para ese codigo</div>
        }else{
            mensajeResultado= null;
        }
        return (
            <div className="row mb-5">
                <div className="col-12 mb-4">
                    <Link to={`/libros/mostrar/${this.props.match.params.id}`} className="btn btn-secondary">
                        <i className="fa fa-arrow-circle-left"></i>{' '}
                        Volver al detalle del Libro
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fa fa-book"></i>{' '}
                        Solicitar Prestamo: {libro.titulo}
                    </h2>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form
                                onSubmit={this.buscarAlumno}
                                className="mb-4"
                            >
                                <legend className="color-primary text-center" >
                                    Busca el suscriptor por codigo
                                </legend>
                                <div className="form-group">
                                    <input type="text" name="busqueda" id="" className="form-control" onChange={this.leerDato} />
                                </div>
                                <input type="submit" value="Buscar Alumno" className="btn btn-success btn-block"/>
                            </form>
                            {/**muestra la ficha del alumno y el boton para solicitar el prestamo */}
                            {fichaAlumno}
                            {btnSolicitar}
                            {/**Muestra un mensaje de no resultados */}
                            {mensajeResultado}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PrestamoLibro.propTypes = {
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
    connect(({ firestore: { ordered }, usuario }, props) => ({
        libro: ordered.libro && ordered.libro[0],
        usuario: usuario
    }), { buscarUsuario })
)(PrestamoLibro);