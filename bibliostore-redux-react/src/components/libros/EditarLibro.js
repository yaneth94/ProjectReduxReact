import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import Swal from 'sweetalert2';

const EditarLibro = ({history, match }) => {
    //uso de Ref
    const tituloRef = useRef('');
    const ISBNRef = useRef('');
    const editorialRef = useRef('');
    const existenciaRef = useRef('');
    //sacando el id de los props
    const id = match.params.id;
    //conexion a la base de firestore para consultar
    useFirestoreConnect(`libros/${id}`)
    const libro = useSelector(state => state.firestore.ordered.libros && state.firestore.ordered.libros[0])
        ;
    console.log(libro);
    const firestore = useFirestore()
    if (!libro) return <Spinner></Spinner>;
    const submitEditarLibro = e => {
        e.preventDefault();

        let libroActualizado = {
            titulo: tituloRef.current.value,
            ISBN: ISBNRef.current.value,
            editorial: editorialRef.current.value,
            existencia: existenciaRef.current.value,
        }
        console.log(libroActualizado);
        firestore.update({
            collection: 'libros',
            doc: libro.id
        },libroActualizado).then(()=>{
            Swal.fire(
                'Editado!',
                'Ha editado un libro.',
                'success'
            )
            history.push('/')
        });
    }

    return (
        <div className="row mb-5">
        <div className="col-12 mb-4">
            <Link to={'/'} className="btn btn-secondary">
                <i className="fa fa-arrow-circle-left"></i>{' '}
                Volver al listado
        </Link>
        </div>
        <div className="col-12">
            <h2>
                <i className="fa fa-book"></i>{' '}
                Editar Libro
            </h2>
            <div className="row justify-content-center">
                <div className="col-md-8 mt-5">
                <form onSubmit={submitEditarLibro}>
                        <div className="form-group">
                            <label >Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="titulo"
                                placeholder="Titulo del Libro"
                                required
                                defaultValue={libro.titulo}
                                ref={tituloRef}
                            />
                        </div>
                        <div className="form-group">
                            <label >ISBN</label>
                            <input
                                type="text"
                                className="form-control"
                                name="ISBN"
                                placeholder="ISBN del libro"
                                required
                                defaultValue={libro.ISBN}
                                ref={ISBNRef}
                            />
                        </div>
                        <div className="form-group">
                            <label >Editorial</label>
                            <input
                                type="text"
                                className="form-control"
                                name="editorial"
                                placeholder="Editorial del Libro"
                                required
                                defaultValue={libro.editorial}
                                ref={editorialRef}
                            />
                        </div>
                        <div className="form-group">
                            <label >Existencias</label>
                            <input
                                type="text"
                                className="form-control"
                                name="existencia"
                                placeholder="Existencia del libro"
                                required
                                defaultValue={libro.existencia}
                                ref={existenciaRef}
                            />
                        </div>
                        <input type="submit" value="Editar Libro" className="btn btn-success" />
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default EditarLibro;