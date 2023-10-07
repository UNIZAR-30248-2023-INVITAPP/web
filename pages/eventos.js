import React, { useState } from 'react';
import Layout from '@/components/layout';
import Evento from '../components/evento'
import { Modal, Button } from 'react-bootstrap';
import { doc, deleteDoc, collection, addDoc } from "firebase/firestore";
import db from '../firebase'




function EventosPage() {

    const [showModal, setShowModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [eventToDeleteIndex, setEventToDeleteIndex] = useState(null);
    const [eventos, setEventos] = useState([]); // Estado para almacenar los eventos
    const [error,setError] = useState(null)
    const [errorFecha,setErrorFecha] = useState(null)

    const [nuevoEvento, setNuevoEvento] = useState({
        nombre: '',
        fecha: '',
        hora: '',
        ubicacion: '',
        id: '',
    });

    // Función que guarda los datos del evento en Firestore y añade el evento a la lista de eventos
    const confirmarEliminacion = async () => {
        if (eventToDeleteIndex !== null) {
            const id = eventos[eventToDeleteIndex].id
            const nuevosEventos = [...eventos];
            nuevosEventos.splice(eventToDeleteIndex, 1);
            await deleteDoc(doc(db,"Eventos", id))
            setEventos(nuevosEventos);

        }
        setEventToDeleteIndex(null); // Limpia el evento a eliminar
        setShowConfirmModal(false); // Cierra el modal de confirmación
    };

    const handleEliminarEvento = (index) => {
        setEventToDeleteIndex(index)
        setShowConfirmModal(true)
    };

    const validarFecha = (fecha) => {
        const regexFecha = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD
    
        if (!regexFecha.test(fecha)) {
            setErrorFecha('Formato de fecha incorrecto')
            return
        }
        
        const partesFecha = fecha.split('-');
        const añoIngresado = parseInt(partesFecha[0]);
        const getYear = () => new Date().getFullYear();
        const añoActual = getYear();
        
        return añoIngresado >= añoActual; // Verifica si el año es futuro o igual al actual
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        // Limpiamos los campos del formulario cuando se cierra el modal
        setNuevoEvento({
            nombre: '',
            fecha: '',
            hora: '',
            ubicacion: '',
        });
    };

    const handleCrearEvento = async (e) => {
        e.preventDefault()
        // Validación de datos antes de agregarlos
        if (
            nuevoEvento.nombre.trim() === '' ||
            nuevoEvento.fecha === '' ||
            nuevoEvento.hora === '' ||
            nuevoEvento.ubicacion.trim() === ''
        ) {
            // Mostrar un mensaje de error si algún campo está vacío
            setError('Todos los campos son obligatorios');
            return;
        }

        if (!validarFecha(nuevoEvento.fecha)){
            setErrorFecha('La fecha del evento tiene que ser posterior a la fecha actual')
            setError('')
            return
        }

        //Guardar datos en Firestore
        try {
            const docRef = await addDoc(collection(db, "Eventos"), {
              nombre: nuevoEvento.nombre,
              fecha: nuevoEvento.fecha,
              hora: nuevoEvento.hora,
              ubicacion: nuevoEvento.ubicacion
            });
            console.log("Document written with ID: ", docRef.id);
            const nuevoEventoConId = {
                ...nuevoEvento,
                id: docRef.id // Almacena el ID del documento recién creado
            };
            // Agregar el nuevo evento al estado de eventos
            setEventos([...eventos, nuevoEventoConId]);
            handleClose(); // Cerrar el modal después de guardar
            setError(null)

          } catch (e) {
            console.error("Error adding document: ", e);
            return
        }    
    };
    


    return (
        <div>
            <Layout>
                {/* Contenido de la página */}
                <div className="container mt-4">
                    <div className="mx-5">
                        <div className='d-flex justify-content-between'>
                            <h1>Mis Eventos</h1>
                            <button className="btn btn-dark m-2" onClick={handleShow}>Crear Evento</button>
                        </div>

                        {/* Modal de crear evento */}
                        <Modal show={showModal} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Crear un nuevo evento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label fw-bold">Nombre del evento</label>
                                    <input 
                                        type="text"
                                        className="form-control" 
                                        id="nombre"
                                        value={nuevoEvento.nombre}
                                        placeholder="Ingrese el nombre del evento" 
                                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, nombre: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fecha" className="form-label fw-bold">Fecha</label>
                                    <input 
                                        type="date"
                                        className="form-control" 
                                        id="fecha"
                                        value={nuevoEvento.fecha}
                                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })} 
                                    />
                                    {errorFecha && <p className="text-center text-danger">{errorFecha}</p>} {/* Mostrar mensaje de error */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hora" className="form-label fw-bold">Hora</label>
                                    <input 
                                        type="time" 
                                        className="form-control" 
                                        id="hora" 
                                        value={nuevoEvento.hora}
                                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ubicacion" className="form-label fw-bold">Ubicación</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="ubicacion" 
                                        placeholder="Ingrese la ubicación del evento" 
                                        value={nuevoEvento.ubicacion}
                                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, ubicacion: e.target.value })}
                                    />
                                </div>
                                <div className="text-center">
                                    {error && <p className="text-danger">{error}</p>} {/* Mostrar mensaje de error */}
                                    <button className="btn btn-dark w-100" onClick={handleCrearEvento}>Crear evento</button>
                                </div>
                                
                            </form>
                            </Modal.Body>
                        </Modal>
                        {/* Modal de crear evento */}


                        {/* Modal de confirmación de eliminación de evento */}
                        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Estás seguro de que quieres eliminar este evento?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                                Cancelar
                                </Button>
                                <Button variant="danger" onClick={confirmarEliminacion}>
                                Eliminar
                                </Button>
                            </Modal.Footer>
                        </Modal>


                            
                        <div className="p-5 rounded bg-light">
                        {/* Carrusel de eventos */}
                            <ul className="list-group">
                            {eventos.map((evento, index) => (
                                <Evento 
                                    key={index} 
                                    {...evento}
                                    onEliminar={() => handleEliminarEvento(index)}
                                />
                            ))}
                            </ul>

                        </div>
                    </div>
                    
                </div>
            </Layout>
        </div>
    );
}

export default EventosPage;
