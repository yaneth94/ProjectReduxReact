import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v4';
import { agregarCitaAction } from '../actions/citasActions';
import { validarFormularioAction } from '../actions/validacionAction';

const AgregarCita = () => {

    //State del componente
    const [mascota, guardarMascota] = useState('');
    const [propietario,guardarPropietario] = useState('');
    const [fecha,guardarFecha] = useState('');
    const [hora,guardarHora] = useState('');
    const [sintomas,guardarSintomas] = useState('');

    //DISPATh para ejecutar nuestras acciones
    const dispatch = useDispatch();
    const agregarNuevaCita = cita => dispatch( agregarCitaAction(cita) );
    const validarFormulario = estado => dispatch( validarFormularioAction(estado));

    //useSelector es similar a mapstateToProps en Hooks
    const error = useSelector((state) => state.error);
   // console.log(error);

    // Cuando el formulario es enviado
    const submitNuevaCita = e => {
        e.preventDefault();

        //Validar el formulario con un reducer se hara
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            validarFormulario(true);
            return;
        }
        validarFormulario(false);

        //Crear la nueva Cita y almacenarla
        agregarNuevaCita({
            id: uuid(),
            mascota,
            propietario,
            fecha,
            hora,
            sintomas
        })

        //Reiniciar el formulario
        guardarMascota('');
        guardarPropietario('');
        guardarFecha('');
        guardarHora('');
        guardarSintomas('');
    }

    return (
        <div className="card mt-5">
            <div className="card-body">
                <h2 className="card-title text-center mb-5">Agrega las citas aqui</h2>
                <form onSubmit={submitNuevaCita}>
                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Name Pet</label>
                        <div className="col-sm-8 col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name Pet"
                                value = {mascota}
                                onChange={e => guardarMascota(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Owner</label>
                        <div className="col-sm-8 col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="owner"
                                value = {propietario}
                                onChange={e => guardarPropietario(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Date</label>
                        <div className="col-sm-8 col-lg-4  mb-4 mb-lg-0">
                            <input
                                type="date"
                                className="form-control"
                                value = {fecha}
                                onChange={e => guardarFecha(e.target.value)}
                            />
                        </div>

                        <label className="col-sm-4 col-lg-2 col-form-label">Hour</label>
                        <div className="col-sm-8 col-lg-4">
                            <input
                                type="time"
                                className="form-control"
                                value = {hora}
                                onChange={e => guardarHora(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-3 col-form-label">Symptom</label>
                        <div className="col-sm-8 col-lg-12">
                            <textarea
                                className="form-control"
                                value = {sintomas}
                                onChange={e => guardarSintomas(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-group row justify-content-end">
                        <div className="col-sm-3">
                            <button type="submit" className="btn btn-success w-100">Agregar</button>
                        </div>
                    </div>
                </form>
                {error.error ? <div className="alert alert-danger text-center p2">Todos los campos son obligatorios</div> : null}
            </div>
        </div>
    );
};

export default AgregarCita;