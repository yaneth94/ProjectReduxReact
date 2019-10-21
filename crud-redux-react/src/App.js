import React from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Header from './components/Header';
import Productos from './components/Productos';
import ProductoNuevo from './components/ProductoNuevo';
import ProductoEditar from './components/ProductoEditar';

function App() {
  return (
    <Router>
      <Header></Header>
      <div className="container mt-4">
        <Switch>
          <Route exact path="/" component={Productos}></Route>
          <Route exact path="/productos/nuevo" component={ProductoNuevo}></Route>
          <Route exact path="/productos/editar/:id" component={ProductoEditar}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
