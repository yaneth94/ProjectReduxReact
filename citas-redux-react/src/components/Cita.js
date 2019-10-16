import React from 'react';
import { useDispatch } from 'react-redux';
import { borrarCitaAction } from '../actions/citasActions';

const Cita = ({cita}) => {
    //Dispatch para mandar llamar a la acción de eliminar
    const dispatch = useDispatch();
    const eliminarCita = id => {
        dispatch(borrarCitaAction(id))
    }
    return (
        <div className="media mt-3">
            <div className="media-body">
                <h3 className="mt-0">{cita.mascota}</h3>
                <p className="card-text"><span>Nombre Dueño:</span>{cita.propietario}</p>
                <p className="card-text"><span>Fecha:</span>{cita.fecha}</p>
                <p className="card-text"><span>Hora:</span>{cita.hora}</p>
                <p className="card-text"><span>Sintomas:</span> <br /> {cita.sintomas}</p>
                <button
                    className="btn btn-danger" onClick={()=>eliminarCita(cita.id)}>Borrar &times;
        </button>
            </div>
        </div>
    );
};

export default Cita;