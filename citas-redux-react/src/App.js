import React from 'react';
import AgregarCita from './components/AgregarCita';
import ListadoCitas from './components/ListadoCitas';

function App() {
  return (
    <div className="container">
      <header>
        <h1 className="text-center">Veterinary Patient Manager</h1>
      </header>
      <div className="row mt-3">
        <div className="col-md-6">
          <AgregarCita></AgregarCita>
        </div>
        <div className="col-md-6">
          <ListadoCitas></ListadoCitas>
        </div>
      </div>
    </div>
  );
}

export default App;
