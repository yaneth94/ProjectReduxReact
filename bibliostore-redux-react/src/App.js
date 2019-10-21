import React from 'react';
//react-router-dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Suscriptores from './components/suscriptores/Suscriptores';
import NuevoSuscriptor from './components/suscriptores/NuevoSuscriptor';
import EditarSuscriptor from './components/suscriptores/EditarSuscriptor';
import MostrarSuscriptor from './components/suscriptores/MostrarSuscriptor';

import NavBar from './components/Layout/Navbar';
import Libros from './components/libros/Libros';
import NuevoLibro from './components/libros/NuevoLibro';
import EditarLibro from './components/libros/EditarLibro';
import PrestamoLibro from './components/libros/PrestamoLibro';
import MostrarLibro from './components/libros/MostrarLibro';
import Login from './components/auth/Login';

import { UserIsNotAuthenticated, UserIsAuthenticated } from './helpers/auth';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <div className="container">
        <Switch>
          <Route exact path="/login" component={UserIsNotAuthenticated(Login)}></Route>

          <Route exact path="/" component={UserIsAuthenticated(Libros)} />
          <Route exact path="/libros/nuevo" component={UserIsAuthenticated(NuevoLibro)} />
          <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditarLibro)} />
          <Route exact path="/libros/mostrar/:id" component={UserIsAuthenticated(MostrarLibro)} />
          <Route exact path="/libros/prestamo/:id" component={PrestamoLibro} />

          <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)} />
          <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)} />
          <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)} />
          <Route exact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
