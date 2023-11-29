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
import ModalGenerico from "@/components/modalGenerico";
import BodyModal from "@/components/bodyModal";
import Spinner from "@/components/Spinner";

// Componente que se corresponde con la página que se muestra de inicio, donde aparece la lista de los eventos
function EventosPage() {
    // Modal que aparece al crear un evento
    const [showModalCrear, setShowModalCrear] = useState(false);
    // Modal para modificar un determinado evento
    const [showModalModificar, setShowModalModificar] = useState(false);
    // Modal de confirmación a la hora de borrar un evento
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [showSpinner, setShowSpinner] = useState(false);

    // Cuando se vaya a eliminar un evento, se añadirán en esta lista
    const [usuariosPendientesCorreo, setUsuariosPendientesCorreo] = useState(
        []
    );

    const [nombreEventoAeliminar, setNombreEventoAeliminar] = useState("");
    const [fechaEventoAeliminar, setFechaEventoAeliminar] = useState("");

    const [showConfirmBorradoMultiple, setShowConfirmBorradoMultiple] =
        useState(false);
    const [eventToDeleteIndex, setEventToDeleteIndex] = useState(null);
    const [eventToUpdateIndex, setEventToUpdateIndex] = useState(null);
    // Estado para almacenar el conjunto de los eventos
    const [eventos, setEventos] = useState([]);

    // Variable para mostrar el botón de eliminación múltiple
    const [showBotonMultiple, setShowBotonMultiple] = useState(false);

    // Estado para registrar aquellos eventos que se han seleccionado
    const [eventosSeleccionados, setEventosSeleccionados] = useState([]);

    // Para mostrar el mensaje de error a la hora de crear el evento
    const [error, setError] = useState(null);
    const [errorFecha, setErrorFecha] = useState(null);

    const [busqueda, setBusqueda] = useState("");

    // State para crear un nuevo evento
    const [nuevoEvento, setNuevoEvento] = useState({
        nombre: "",
        fecha: "",
        hora: "",
        ubicacion: "",
        invitados: [],
        id: "",
    });

    const [eventoCambiar, setEventoCambiar] = useState({});

    // Esta función se encarga de recuperar eventos desde una base de datos Firebase,
    // formatear los datos obtenidos y almacenarlos en un arreglo de eventos.
    // Luego, ordena el arreglo de eventos por nombre y actualiza el estado con los eventos obtenidos.
    const fetchEventos = async () => {
        const eventosFirebase = await getDocs(collection(db, "Eventos"));
        //console.log(eventosFirebase);
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
                    ) ?? [],
            };
        });

        eventosArray.sort((a, b) => a.nombre.localeCompare(b.nombre));

        // Cambia el formato de la fecha para que se vea en el DOM de manera más legible
        const eventosFechaDate = eventosArray.map((evento) => {
            const eventoCopia = { ...evento };
            const fechaDate = new Date(evento.fecha);
            // Formatear la fecha en un formato legible
            const options = { year: "numeric", month: "long", day: "numeric" };
            eventoCopia.fecha = fechaDate.toLocaleDateString("es-ES", options);
            return eventoCopia;
        });
        setEventos(eventosFechaDate);
    };

    // Función empleada para eliminar/añadir un evento a la lista de eventos seleccionados
    const handleSelectEvento = (index) => {
        // Verificar si el evento ya está seleccionad
        const isSelected = eventosSeleccionados.includes(index);

        if (isSelected) {
            // Si ya está seleccionado, quitarlo de la lista de seleccionados
            setEventosSeleccionados(
                eventosSeleccionados.filter((id) => id !== index)
            );
        } else {
            // Si no está seleccionado, agregarlo a la lista de seleccionados
            setEventosSeleccionados([...eventosSeleccionados, index]);
        }
    };

    useEffect(() => {
        // Mostrar el boton de borrado múltiple en función del número de eventos seleccionados
        eventosSeleccionados.length >= 1
            ? setShowBotonMultiple(true)
            : setShowBotonMultiple(false);
    }, [eventosSeleccionados]);

    // Esta funcion crea el JSON necesario para enviar en el request al servicio web que envía los correos electrónicos
    const crearJsonRequestCorreo = () => {
        const emailsReceptores = usuariosPendientesCorreo.map(
            (usuario) => usuario.email
        );
        const bodyJson = {
            nombreEvento: nombreEventoAeliminar,
            fechaEvento: fechaEventoAeliminar,
            emails: emailsReceptores,
        };
        return bodyJson;
    };

    const sendPostRequestToMailService = async (json) => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
            };

            const response = await fetch("/api/sendMail", requestOptions);

            if (!response.ok) {
                // Manejar errores de red o servidor
                throw new Error("Error al enviar la solicitud");
            }

            const data = await response.json();
            console.log(data.message); // Mensaje de confirmación del servidor
        } catch (error) {
            console.error("Error al enviar los correos desde React:", error);
            // Manejar el error de manera apropiada para tu aplicación
        }
    };

    // Función para eliminar definitivamente el evento cuando aparece el modal de confirmación
    // Además en esta función es donde se gestiona el envío de correos electrónicos a los invitados
    const confirmarEliminacionEvento = async () => {
        setShowSpinner(true);
        console.log(eventos[eventToDeleteIndex].invitados);
        try {
            if (eventToDeleteIndex !== null) {
                const id = eventos[eventToDeleteIndex].id;
                const nuevosEventos = [...eventos];
                nuevosEventos.splice(eventToDeleteIndex, 1);
                await deleteDoc(doc(db, "Eventos", id));
                setEventos(nuevosEventos);

                // TODO: Descomentar la línea de debajo para que se envíen los correos electrónicos
                //const bodyRequest = crearJsonRequestCorreo()
                //await sendPostRequestToMailService(bodyRequest)
            }
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setShowConfirmModal(false);
            setEventToDeleteIndex(null); // Limpia el evento a eliminar
            setShowSpinner(false);
            setUsuariosPendientesCorreo([]);
        }
    };

    // Almacenar los eventos que se van a mantener, y enviar la peticion
    // Firebase para eliminar todos los eventos que se han seleccionado
    const handleEliminarEventoMultiple = async () => {
        try {
            const nuevosEventos = eventos.filter(
                (evento, index) => !eventosSeleccionados.includes(index)
            );

            await Promise.all(
                eventosSeleccionados.map(async (selectedIndex) => {
                    const idFirebase = eventos[selectedIndex].id;
                    await deleteDoc(doc(db, "Eventos", idFirebase));
                })
            );

            setEventos(nuevosEventos);
            setEventosSeleccionados([]);
            setShowConfirmBorradoMultiple(false);
        } catch (error) {
            console.error("Error al eliminar eventos múltiples:", error);
        }
    };

    // Almacena en el estado el índice del evento a borrar y muestra el modal de confirmación
    const handleEliminarEvento = (index) => {
        setEventToDeleteIndex(index);
        setShowConfirmModal(true);
    };

    const establecerPropiedadesCorreo = (invitados, nombre, fecha) => {
        setUsuariosPendientesCorreo(invitados);
        setNombreEventoAeliminar(nombre);
        setFechaEventoAeliminar(fecha);
    };

    // Muestra el modal de crear evento
    const handleShow = () => setShowModalCrear(true);

    // Función para cerrar el modal de crear evento.
    // Se cierra el modal y se limpian los campos corresponientes a un nuevo evento
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
        setError("");
    };

    // Función que se utiliza para verificar si la fecha introducida es posterior a la actual
    const validarFecha = (fecha) => {
        const regexFecha = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD

        if (!regexFecha.test(fecha)) {
            setErrorFecha("Formato de fecha incorrecto");
            return;
        }

        const partesFecha = fecha.split("-");
        const añoIngresado = parseInt(partesFecha[0]);
        const mesIngresado = parseInt(partesFecha[1]);
        const diaIngresado = parseInt(partesFecha[2]);

        const getYear = () => new Date().getFullYear();
        const getMonth = () => new Date().getMonth() + 1; // Mes actual (0-11) -> (1-12)
        const getDay = () => new Date().getDate(); // Día actual del mes

        const añoActual = getYear();
        const mesActual = getMonth();
        const diaActual = getDay();

        if (añoIngresado > añoActual) {
            return true; // El año ingresado es futuro
        } else if (añoIngresado === añoActual) {
            // El año es igual, verifica el mes
            if (mesIngresado > mesActual) {
                return true; // El mes ingresado es futuro
            } else if (mesIngresado === mesActual) {
                // El mes es igual, verifica el día
                if (diaIngresado === diaActual) {
                    setErrorFecha(
                        "No se pueden reservar eventos en el día actual, debe reservarlos como mínimo el día siguiente"
                    );
                    return false;
                } else if (diaIngresado > diaActual) {
                    return true;
                } else {
                    setErrorFecha(
                        "La fecha del evento tiene que ser posterior a la fecha actual"
                    );
                    return false;
                }
            } else {
                setErrorFecha(
                    "La fecha del evento tiene que ser posterior a la fecha actual"
                );
                return false;
            }
        } else {
            setErrorFecha(
                "La fecha del evento tiene que ser posterior a la fecha actual"
            );
            return false;
        }
    };

    const handleHideConfirmacionModal = () => {
        setShowConfirmModal(false);
        setUsuariosPendientesCorreo([]);
    };

    // Funcion que se ejecuta al crear evento en el modal de "crear evento"
    const handleCrearEvento = async (e) => {
        e.preventDefault();

        // Comprobar que ningún evento se crea con campos vacíos
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
        // Validar el formato de la fecha
        if (!validarFecha(nuevoEvento.fecha)) {
            setError("");
            return;
        }

        // ----------------------------

        // Se tiene que mantener que ningún evento tenga mismo nombre, fecha y ubicación
        const fechaAux = nuevoEvento.fecha;
        const fechaDate = new Date(fechaAux);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaFormateada = fechaDate.toLocaleDateString("es-ES", options);

        const eventoExistente = eventos.find(
            (evento) =>
                evento.nombre === nuevoEvento.nombre &&
                evento.fecha === fechaFormateada &&
                evento.ubicacion === nuevoEvento.ubicacion
        );
        if (eventoExistente) {
            setError("Ya existe un evento con esas propiedades");
            return;
        }

        // Almacenar los datos en Cloud Firestore
        try {
            const docRef = await addDoc(collection(db, "Eventos"), {
                nombre: nuevoEvento.nombre,
                fecha: nuevoEvento.fecha,
                hora: nuevoEvento.hora,
                ubicacion: nuevoEvento.ubicacion,
                invitados: nuevoEvento.invitados,
            });
            //console.log("Document written with ID: ", docRef.id);

            const fechaDate = new Date(nuevoEvento.fecha);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const fechaFormateada = fechaDate.toLocaleDateString(
                "es-ES",
                options
            );
            nuevoEvento.fecha = fechaFormateada;
            const nuevoEventoConId = {
                ...nuevoEvento,
                id: docRef.id, // Almacena el ID del documento recién creado
            };
            // Agregar el nuevo evento al estado de eventos
            setEventos([...eventos, nuevoEventoConId]);
            handleCloseCrear(); // Cerrar el modal después de guardar
            setErrorFecha(null);
            setError(null);
        } catch (e) {
            console.error("Error adding document: ", e);
            return;
        }
    };

    // Funcion que se encarga de modificar un determinado evento y comprueba los diferentes campos del formulario
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
            setError("");
            return;
        }

        // Se tiene que mantener que ningún evento tenga mismo nombre, fecha y ubicación
        const fechaAux = eventoCambiar.fecha;
        const fechaDate = new Date(fechaAux);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaFormateada = fechaDate.toLocaleDateString("es-ES", options);

        // Comprobar que no existe un evento con esas propiedades
        const eventoExistente = eventos.find(
            (evento) =>
                evento.nombre === eventoCambiar.nombre &&
                evento.fecha === fechaFormateada &&
                evento.ubicacion === eventoCambiar.ubicacion
        );
        if (eventoExistente) {
            setError("Ya existe un evento con esas propiedades");
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
            setErrorFecha(null);
            setError(null);
        } catch (e) {
            console.error("Error adding document: ", e);
            return;
        }
        //console.log(eventoCambiar);
    };

    // El hook useEffect se utiliza para hacer la peticion a Cloud Firestore y mostrar
    // los datos de los eventos cuando se realiza la renderización del componente
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
                            <h1 className="fw-bold text-center m-2">
                                Mis Eventos
                            </h1>
                            <form
                                className="d-flex mx-5 p-2 flex-grow-1 text-center"
                                role="search"
                                id="form"
                            >
                                <input
                                    value={busqueda}
                                    id="searchBar"
                                    onChange={(e) =>
                                        setBusqueda(e.target.value)
                                    }
                                    className="form-control border-2"
                                    type="search"
                                    placeholder="Buscar un evento..."
                                    aria-label="Search"
                                />
                            </form>
                            <button
                                className="btn btn-dark my-2"
                                onClick={handleShow}
                            >
                                Crear Evento
                            </button>
                        </div>

                        {/* Modal de confirmación borrado múltiple de eventos */}
                        <ModalGenerico
                            id="modalConfirmacionEliminarEventoMultiple"
                            show={showConfirmBorradoMultiple}
                            titulo="Borrar los eventos seleccionados"
                            cuerpo="¿Está seguro de que desea eliminar los eventos seleccionados?"
                            onHide={() => setShowConfirmBorradoMultiple(false)}
                            onEliminar={() => handleEliminarEventoMultiple()}
                        />
                        {/* ------------------------------------------------------- */}

                        {/* Modal de modificar eventos */}
                        <ModalGenerico
                            id="modalModificar"
                            show={showModalModificar}
                            titulo="Modificar un evento"
                            cuerpo={
                                <BodyModal
                                    nombreEvento={eventoCambiar.nombre}
                                    onChangeNombre={(e) =>
                                        setEventoCambiar({
                                            ...eventoCambiar,
                                            nombre: e.target.value,
                                        })
                                    }
                                    fechaEvento={eventoCambiar.fecha}
                                    onChangeFecha={(e) =>
                                        setEventoCambiar({
                                            ...eventoCambiar,
                                            fecha: e.target.value,
                                        })
                                    }
                                    horaEvento={eventoCambiar.hora}
                                    onChangeHora={(e) =>
                                        setEventoCambiar({
                                            ...eventoCambiar,
                                            hora: e.target.value,
                                        })
                                    }
                                    ubicacionEvento={eventoCambiar.ubicacion}
                                    onChangeUbicacion={(e) =>
                                        setEventoCambiar({
                                            ...eventoCambiar,
                                            ubicacion: e.target.value,
                                        })
                                    }
                                    error={error}
                                    onClickEvento={handleModificarEvento}
                                    errorFecha={errorFecha}
                                    buttonName="Modificar Evento"
                                />
                            }
                            onHide={() => {
                                setShowModalModificar(false);
                                setErrorFecha("");
                                setError(null);
                            }}
                        />
                        {/* ----------------------------------------------- */}

                        {/* Modal de confirmación de eliminación de evento */}
                        <ModalGenerico
                            id="modalConfirmarEliminarEventoSimple"
                            show={showConfirmModal}
                            titulo="Confirmar eliminación"
                            cuerpo="¿Estás seguro de que deseas eliminar este evento?"
                            onHide={() => handleHideConfirmacionModal()}
                            onEliminar={confirmarEliminacionEvento}
                        />
                        {/* ----------------------------------------------- */}

                        {/* Modal de crear evento */}
                        <ModalGenerico
                            id="modalCrearEvento"
                            show={showModalCrear}
                            titulo="Crear un nuevo evento"
                            cuerpo={
                                <BodyModal
                                    nombreEvento={nuevoEvento.nombre}
                                    onChangeNombre={(e) =>
                                        setNuevoEvento({
                                            ...nuevoEvento,
                                            nombre: e.target.value,
                                        })
                                    }
                                    fechaEvento={nuevoEvento.fecha}
                                    onChangeFecha={(e) =>
                                        setNuevoEvento({
                                            ...nuevoEvento,
                                            fecha: e.target.value,
                                        })
                                    }
                                    horaEvento={nuevoEvento.hora}
                                    onChangeHora={(e) =>
                                        setNuevoEvento({
                                            ...nuevoEvento,
                                            hora: e.target.value,
                                        })
                                    }
                                    ubicacionEvento={nuevoEvento.ubicacion}
                                    onChangeUbicacion={(e) =>
                                        setNuevoEvento({
                                            ...nuevoEvento,
                                            ubicacion: e.target.value,
                                        })
                                    }
                                    error={error}
                                    onClickEvento={handleCrearEvento}
                                    errorFecha={errorFecha}
                                    buttonName="Crear Evento"
                                />
                            }
                            onHide={handleCloseCrear}
                        />

                        {/* Carrusel donde aparecen todos los eventos */}
                        <div className="p-3 p-md-5 mt-3 rounded bg-light">
                            {/* Carrusel de eventos */}
                            {showBotonMultiple ? (
                                <Button
                                    className="mx-auto d-block mb-3"
                                    variant="danger"
                                    size="lg"
                                    onClick={() =>
                                        setShowConfirmBorradoMultiple(true)
                                    }
                                >
                                    Eliminar los eventos seleccionados
                                </Button>
                            ) : null}
                            <ul className="list-group">
                                {eventos
                                    .filter((evento) =>
                                        evento.nombre
                                            .trim()
                                            .toLowerCase()
                                            .includes(
                                                busqueda
                                                    .trim()
                                                    .toLocaleLowerCase()
                                            )
                                    )
                                    .map((evento, index) => (
                                        <Evento
                                            key={evento.id}
                                            {...evento}
                                            onCambio={() => {
                                                setEventToUpdateIndex(index);
                                                setEventoCambiar({
                                                    id: evento.id,
                                                    nombre: evento.nombre,
                                                    fecha: evento.fecha,
                                                    hora: "",
                                                    ubicacion: evento.ubicacion,
                                                });
                                                setShowModalModificar(true);
                                            }}
                                            onEliminar={() =>
                                                handleEliminarEvento(index)
                                            }
                                            showBoton={showBotonMultiple}
                                            onSelectEvento={() =>
                                                handleSelectEvento(index)
                                            }
                                            Seleccionado={
                                                eventosSeleccionados.includes(
                                                    index
                                                )
                                                    ? true
                                                    : false
                                            }
                                            setUsuariosPendientesCorreo={
                                                establecerPropiedadesCorreo
                                            }
                                            actualizarInvitados={(
                                                invitados
                                            ) => {
                                                const eventosUpdated = [
                                                    ...eventos,
                                                ];
                                                eventosUpdated.at(
                                                    index
                                                ).invitados = invitados;
                                                setEventos(eventosUpdated);
                                            }}
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
