import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class Navbar extends Component {
    state = {
        usuarioAutenticado: false
    }

    // recibe los props automaticamente
    //reemplaza componenet wil receive props
    static getDerivedStateFromProps(nextProps, prevState) {
        const { auth } = nextProps;
        if (auth.uid) {
            return { usuarioAutenticado: true }
        } else {
            return { usuarioAutenticado: false }
        }
    }
    //cerrar sesion
    cerrarSesion = () => {
        const { firebase } = this.props;
        firebase.logout();
    }

    render() {
        const { usuarioAutenticado } = this.state
        //extraer datos de autentificacion
        const { auth } = this.props
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
                    <div className="container">
                        <Link className="navbar-brand" to={'/'}>Administrador de Biblioteca</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            {usuarioAutenticado ? (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={'/suscriptores'} className="nav-link">Suscriptores</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link">Libros</Link>
                                    </li>
                                </ul>
                            ) : null}
                            {usuarioAutenticado ?(
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a href="#!" className="nav-link">
                                            {auth.email}
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={this.cerrarSesion}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            ): null}
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    }
};
Navbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(Navbar);