import { BUSCAR_USUARIO } from '../actions/types';

const initialState ={};

export default function( state = initialState, action){
    switch (action.type) {
        case BUSCAR_USUARIO:
        return {
            ...state,
            nombre: action.payload.nombre,
            apellido: action.payload.apellido,
            codigo: action.payload.codigo,
            carrera: action.payload.carrera
        }
        default:
            return state;
    }
}