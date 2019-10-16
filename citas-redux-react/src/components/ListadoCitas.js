import React from 'react';
import { useSelector } from 'react-redux';
import Cita from './Cita';

const ListadoCitas = () => {
    //obtener las citas del state
    const citas = useSelector((state) => state.citas);
    //MENSAJE CONDICIONAL
    const mensaje = Object.keys(citas.citas).length === 0 ? 'No Appointments': 'Manage appointments';
    
    return (
        <div className="card mt-5">
            <div className="media-body ml-3 my-3">
                <h2 className="card-title text-center">{mensaje}</h2>
                <div className="lista-citas">
                    {citas.citas.map(cita => (
                        <Cita
                            key={cita.id}
                            cita={cita}
                        ></Cita>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListadoCitas;