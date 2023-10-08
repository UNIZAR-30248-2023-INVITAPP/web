import React, { useState, useEffect } from "react";
import Layout from "@/components/layout";
import Evento from "../components/evento";
import { Modal, Button } from "react-bootstrap";
import {
    doc,
    updateDoc,
    deleteDoc,
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";
import db from "../firebase";

function EventosPage() {
    const [showModalCrear, setShowModalCrear] = useState(false);
    const [showModalModificar, setShowModalModificar] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [eventToDeleteIndex, setEventToDeleteIndex] = useState(null);
    const [eventToUpdateIndex, setEventToUpdateIndex] = useState(null);
    const [eventos, setEventos] = useState([]); // Estado para almacenar los eventos
    const [error, setError] = useState(null);
    const [errorFecha, setErrorFecha] = useState(null);

    const [nuevoEvento, setNuevoEvento] = useState({
        nombre: "",
        fecha: "",
        hora: "",
        ubicacion: "",
        invitados: [],
        id: "",
    });

    const [eventoCambiar, setEventoCambiar] = useState({});

    const fetchEventos = async () => {
        const eventosFirebase = await getDocs(collection(db, "Eventos"));
        const eventosArray = eventosFirebase.docs.map((evento, index) => {
            return {
                id: evento.id,
                fecha: evento._document.data.value.mapValue.fields.fecha
                    .stringValue,
                hora: evento._document.data.value.mapValue.fields.hora
                    .stringValue,
                nombre: evento._document.data.value.mapValue.fields.nombre
                    .stringValue,
                ubicacion:
                    evento._document.data.value.mapValue.fields.ubicacion
                        .stringValue,
                invitados:
                    evento._document.data.value.mapValue.fields.invitados.arrayValue.values?.map(
                        (invitado) => {
                            return {
                                nombre: invitado.mapValue.fields.nombre
                                    .stringValue,
                                DNI: invitado.mapValue.fields.DNI.stringValue,
                                email: invitado.mapValue.fields.email
                                    .stringValue,
                            };
                        }
                    ),
            };
        });
        eventosArray.reverse();
        setEventos(eventosArray);
    };

    // Función que guarda los datos del evento en Firestore y añade el evento a la lista de eventos
    const confirmarEliminacion = async () => {
        if (eventToDeleteIndex !== null) {
            const id = eventos[eventToDeleteIndex].id;
            const nuevosEventos = [...eventos];
            nuevosEventos.splice(eventToDeleteIndex, 1);
            await deleteDoc(doc(db, "Eventos", id));
            setEventos(nuevosEventos);
        }
        setEventToDeleteIndex(null); // Limpia el evento a eliminar
        setShowConfirmModal(false); // Cierra el modal de confirmación
    };

    const handleEliminarEvento = (index) => {
        setEventToDeleteIndex(index);
        setShowConfirmModal(true);
    };

    const validarFecha = (fecha) => {
        const regexFecha = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD

        if (!regexFecha.test(fecha)) {
            setErrorFecha("Formato de fecha incorrecto");
            return;
        }

        const partesFecha = fecha.split("-");
        const añoIngresado = parseInt(partesFecha[0]);
        const getYear = () => new Date().getFullYear();
        const añoActual = getYear();

        return añoIngresado >= añoActual; // Verifica si el año es futuro o igual al actual
    };

    const handleShow = () => setShowModalCrear(true);
    const handleCloseCrear = () => {
        setShowModalCrear(false);
        // Limpiamos los campos del formulario cuando se cierra el modal
        setNuevoEvento({
            nombre: "",
            fecha: "",
            hora: "",
            ubicacion: "",
            invitados: [],
        });
    };

    const handleCrearEvento = async (e) => {
        e.preventDefault();
        // Validación de datos antes de agregarlos
        if (
            nuevoEvento.nombre.trim() === "" ||
            nuevoEvento.fecha === "" ||
            nuevoEvento.hora === "" ||
            nuevoEvento.ubicacion.trim() === ""
        ) {
            // Mostrar un mensaje de error si algún campo está vacío
            setError("Todos los campos son obligatorios");
            return;
        }

        if (!validarFecha(nuevoEvento.fecha)) {
            setErrorFecha(
                "La fecha del evento tiene que ser posterior a la fecha actual"
            );
            setError("");
            return;
        }

        //Guardar datos en Firestore
        try {
            const docRef = await addDoc(collection(db, "Eventos"), {
                nombre: nuevoEvento.nombre,
                fecha: nuevoEvento.fecha,
                hora: nuevoEvento.hora,
                ubicacion: nuevoEvento.ubicacion,
                invitados: nuevoEvento.invitados,
            });
            console.log("Document written with ID: ", docRef.id);
            const nuevoEventoConId = {
                ...nuevoEvento,
                id: docRef.id, // Almacena el ID del documento recién creado
            };
            // Agregar el nuevo evento al estado de eventos
            setEventos([...eventos, nuevoEventoConId]);
            handleCloseCrear(); // Cerrar el modal después de guardar
            setError(null);
        } catch (e) {
            console.error("Error adding document: ", e);
            return;
        }
    };

    const handleModificarEvento = async (e) => {
        e.preventDefault();
        // Validación de datos antes de agregarlos
        if (
            eventoCambiar.nombre.trim() === "" ||
            eventoCambiar.fecha === "" ||
            eventoCambiar.hora === "" ||
            eventoCambiar.ubicacion.trim() === ""
        ) {
            // Mostrar un mensaje de error si algún campo está vacío
            setError("Todos los campos son obligatorios");
            return;
        }

        if (!validarFecha(eventoCambiar.fecha)) {
            setErrorFecha(
                "La fecha del evento tiene que ser posterior a la fecha actual"
            );
            setError("");
            return;
        }
        //Guardar datos en Firestore
        try {
            const res = await updateDoc(doc(db, "Eventos", eventoCambiar.id), {
                nombre: eventoCambiar.nombre,
                fecha: eventoCambiar.fecha,
                hora: eventoCambiar.hora,
                ubicacion: eventoCambiar.ubicacion,
            });
            // Agregar el cambio de  evento al estado de eventos
            await fetchEventos();
            setShowModalModificar(false); // Cerrar el modal después de guardar
            setEventToUpdateIndex(null);
            setError(null);
        } catch (e) {
            console.error("Error adding document: ", e);
            return;
        }
        console.log(eventoCambiar);
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    return (
        <div>
            <Layout>
                {/* Contenido de la página */}
                <div className="container mt-4">
                    <div className="mx-4 mx-md-5">
                        <div className="d-flex flex-column flex-md-row justify-content-between">
                            <h1 className="fw-bold text-center">Mis Eventos</h1>
                            <button
                                className="btn btn-dark m-2"
                                onClick={handleShow}
                            >
                                Crear Evento
                            </button>
                        </div>

                        {/* Modal de crear evento */}
                        <Modal
                            show={showModalCrear}
                            onHide={handleCloseCrear}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Crear un nuevo evento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="nombre"
                                            className="form-label fw-bold"
                                        >
                                            Nombre del evento
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            value={nuevoEvento.nombre}
                                            placeholder="Ingrese el nombre del evento"
                                            onChange={(e) =>
                                                setNuevoEvento({
                                                    ...nuevoEvento,
                                                    nombre: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="fecha"
                                            className="form-label fw-bold"
                                        >
                                            Fecha
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fecha"
                                            value={nuevoEvento.fecha}
                                            onChange={(e) =>
                                                setNuevoEvento({
                                                    ...nuevoEvento,
                                                    fecha: e.target.value,
                                                })
                                            }
                                        />
                                        {errorFecha && (
                                            <p className="text-center text-danger">
                                                {errorFecha}
                                            </p>
                                        )}{" "}
                                        {/* Mostrar mensaje de error */}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="hora"
                                            className="form-label fw-bold"
                                        >
                                            Hora
                                        </label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="hora"
                                            value={nuevoEvento.hora}
                                            onChange={(e) =>
                                                setNuevoEvento({
                                                    ...nuevoEvento,
                                                    hora: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="ubicacion"
                                            className="form-label fw-bold"
                                        >
                                            Ubicación
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="ubicacion"
                                            placeholder="Ingrese la ubicación del evento"
                                            value={nuevoEvento.ubicacion}
                                            onChange={(e) =>
                                                setNuevoEvento({
                                                    ...nuevoEvento,
                                                    ubicacion: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="text-center">
                                        {error && (
                                            <p className="text-danger">
                                                {error}
                                            </p>
                                        )}{" "}
                                        {/* Mostrar mensaje de error */}
                                        <button
                                            className="btn btn-dark w-100"
                                            onClick={handleCrearEvento}
                                        >
                                            Crear evento
                                        </button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal>

                        {/* Modal de modificar evento */}
                        <Modal
                            show={showModalModificar}
                            onHide={() => {
                                setShowModalModificar(false);
                            }}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Modificar un evento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="nombre"
                                            className="form-label fw-bold"
                                        >
                                            Nombre del evento
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            value={eventoCambiar.nombre}
                                            placeholder="Ingrese el nombre del evento"
                                            onChange={(e) =>
                                                setEventoCambiar({
                                                    ...eventoCambiar,
                                                    nombre: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="fecha"
                                            className="form-label fw-bold"
                                        >
                                            Fecha
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fecha"
                                            value={eventoCambiar.fecha}
                                            onChange={(e) =>
                                                setEventoCambiar({
                                                    ...eventoCambiar,
                                                    fecha: e.target.value,
                                                })
                                            }
                                        />
                                        {errorFecha && (
                                            <p className="text-center text-danger">
                                                {errorFecha}
                                            </p>
                                        )}{" "}
                                        {/* Mostrar mensaje de error */}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="hora"
                                            className="form-label fw-bold"
                                        >
                                            Hora
                                        </label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="hora"
                                            value={eventoCambiar.hora}
                                            onChange={(e) =>
                                                setEventoCambiar({
                                                    ...eventoCambiar,
                                                    hora: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="ubicacion"
                                            className="form-label fw-bold"
                                        >
                                            Ubicación
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="ubicacion"
                                            placeholder="Ingrese la ubicación del evento"
                                            value={eventoCambiar.ubicacion}
                                            onChange={(e) =>
                                                setEventoCambiar({
                                                    ...eventoCambiar,
                                                    ubicacion: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="text-center">
                                        {error && (
                                            <p className="text-danger">
                                                {error}
                                            </p>
                                        )}{" "}
                                        {/* Mostrar mensaje de error */}
                                        <button
                                            className="btn btn-dark w-100"
                                            onClick={handleModificarEvento}
                                        >
                                            Modificar evento
                                        </button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal>

                        {/* Modal de confirmación de eliminación de evento */}
                        <Modal
                            show={showConfirmModal}
                            onHide={() => setShowConfirmModal(false)}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Estás seguro de que quieres eliminar este
                                evento?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowConfirmModal(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={confirmarEliminacion}
                                >
                                    Eliminar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className="p-3 p-md-5 mt-3 rounded bg-light">
                            {/* Carrusel de eventos */}
                            <ul className="list-group">
                                {eventos.map((evento, index) => (
                                    <Evento
                                        key={index}
                                        {...evento}
                                        onCambio={() => {
                                            setEventToUpdateIndex(index);
                                            setEventoCambiar({
                                                id: evento.id,
                                                nombre: evento.nombre,
                                                fecha: evento.fecha,
                                                hora: evento.hora,
                                                ubicacion: evento.ubicacion,
                                            });
                                            setShowModalModificar(true);
                                        }}
                                        onEliminar={() =>
                                            handleEliminarEvento(index)
                                        }
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
