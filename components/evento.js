// Evento.js

import React, { useEffect, useState } from "react";
import { Modal, ListGroup, Form, Button, Row, Col } from "react-bootstrap";
import db from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

function Evento({ id, nombre, fecha, hora, ubicacion, invitados, onEliminar }) {
    const [invitadosArray, setInvitados] = useState(invitados);
    const [emailInvalido, setEmailInvaido] = useState(false);
    const [nombreInvalido, setNombrelInvaido] = useState(false);
    const [DNIInvalido, setDNIInvalido] = useState(false);
    const [showInvitados, setShowInvitados] = useState(false);
    const [showConfirmacionEliminar, setShowConfirmacionEliminar] =
        useState(false);
    const [indexInvitadoEliminar, setIndexInvitadoEliminar] = useState(null);

    const validarDNI = (DNI) => {
        // Validar DNI
        var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        DNI = DNI.toUpperCase();
        if (!nifRexp.test(DNI) && !nieRexp.test(DNI)) {
            setDNIInvalido(true);
            return false;
        }

        return true;
    };

    const handleSubmitAnadirInvitado = async (event) => {
        setNombrelInvaido(false);
        setDNIInvalido(false);
        setEmailInvaido(false);
        event.preventDefault();
        const nombre = event.target.formNombre.value;
        const DNI = event.target.formDNI.value;
        const email = event.target.formEmail.value;
        // Valido el dni
        if (validarDNI(DNI) === true) {
            console.log({ nombre, DNI, email });
        }
        // Añado el invitado a firebase
        try {
            const res = await updateDoc(doc(db, "Eventos", id), {
                invitados: [
                    ...invitados,
                    {
                        nombre: nombre,
                        email: DNI,
                        DNI: email,
                    },
                ],
            });
            // Actualizo mis invitados
            setInvitados([
                ...invitadosArray,
                {
                    nombre: nombre,
                    email: DNI,
                    DNI: email,
                },
            ]);
            //
            event.target.formNombre.value = null;
            event.target.formDNI.value = null;
            event.target.formEmail.value = null;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleEliminarInvitado = async (index) => {
        setIndexInvitadoEliminar(index);
        setShowInvitados(false);
        setShowConfirmacionEliminar(true);
    };

    const handleConfirmarEliminarInvitado = async () => {
        if (indexInvitadoEliminar === null) return;
        const nuevosInvitados = [...invitadosArray];
        nuevosInvitados.splice(indexInvitadoEliminar, 1);
        try {
            const res = await updateDoc(doc(db, "Eventos", id), {
                invitados: [...nuevosInvitados],
            });
            // Actualizo mis invitados
            setInvitados([...nuevosInvitados]);
            //
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setIndexInvitadoEliminar(null);
        setShowConfirmacionEliminar(false);
        setShowInvitados(true);
    };

    const listaInvitados = () => {
        if (invitadosArray.length > 0) {
            return (
                <ListGroup>
                    {invitadosArray.map((invitado, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <div className="d-flex flex-column flex-md-row gap-2 justify-content-between ">
                                    <div>
                                        <span className="fw-bold d-block mt-1">
                                            Nombre:{" "}
                                            <span className="fw-light">
                                                {invitado.nombre}
                                            </span>
                                        </span>
                                        <span className="fw-bold d-block mt-1">
                                            Email:{" "}
                                            <span className="fw-light">
                                                {invitado.email}
                                            </span>
                                        </span>
                                        <span className="fw-bold d-block mt-1">
                                            DNI:{" "}
                                            <span className="fw-light">
                                                {invitado.DNI}
                                            </span>
                                        </span>
                                    </div>

                                    {/* Botón de eliminación a la derecha */}
                                    <div className="d-grid my-auto d-md-inline gap-2">
                                        <button
                                            className="my-2 btn btn-danger" // Estilo de botón de eliminación
                                            onClick={() =>
                                                handleEliminarInvitado(index)
                                            } // Manejador para eliminar el evento por índice
                                        >
                                            {" "}
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            );
        } else
            return (
                <span className="fw-bold d-block mt-1 text-center">
                    Aun no hay invitados para este evento
                </span>
            );
    };

    return (
        <>
            <li className="mb-4 list-group-item border border-2 rounded col-12 col-lg-8 mx-auto">
                <div className="d-flex flex-column py-2 flex-md-row gap-3 justify-content-between align-items-center">
                    <div>
                        <h5 className="fw-bold">{nombre}</h5>
                        <span className="fw-bold d-block mt-1">
                            Fecha: <span className="fw-light">{fecha}</span>
                        </span>
                        <span className="fw-bold d-block mt-1">
                            Hora: <span className="fw-light">{hora}</span>
                        </span>
                        <span className="fw-bold d-block mt-1">
                            Ubicación:{" "}
                            <span className="fw-light">{ubicacion}</span>
                        </span>
                    </div>
                    <div className="d-flex flex-column pb-3 pb-md-0 flex-md-row gap-3">
                        {/* Botón de ver invitados a la derecha */}
                        <button
                            className="btn btn-primary" // Estilo de botón primario
                            onClick={() => {
                                setShowInvitados(true);
                            }}
                        >
                            {" "}
                            Ver invitados
                        </button>

                        {/* Botón de eliminación a la derecha */}
                        <button
                            className="btn btn-block btn-danger" // Estilo de botón de eliminación
                            onClick={onEliminar} // Manejador para eliminar el evento por índice
                        >
                            {" "}
                            Borrar
                        </button>
                    </div>
                </div>
            </li>
            {/* Modal de listado de invitados */}
            <Modal
                className="pt-2 px-2 pt-md-0 px-md-0"
                show={showInvitados}
                onHide={() => {
                    setNombrelInvaido(false);
                    setDNIInvalido(false);
                    setEmailInvaido(false);
                    setShowInvitados(false);
                }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Lista de invitados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitAnadirInvitado}>
                        <Row className="mb-3">
                            <Form.Group
                                as={Col}
                                md="8"
                                className="mb-3"
                                controlId="formNombre"
                            >
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Introduzca nombre"
                                    required
                                    isInvalid={nombreInvalido}
                                />
                                <Form.Control.Feedback type="invalid">
                                    El nombre no puede estar vacio
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md="4"
                                className="mb-3"
                                controlId="formDNI"
                            >
                                <Form.Label>DNI</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Introduzca DNI"
                                    required
                                    isInvalid={DNIInvalido}
                                />
                                <Form.Control.Feedback type="invalid">
                                    DNI invalido
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                md="12"
                                className="mb-3"
                                controlId="formEmail"
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Introduzca email"
                                    required
                                    isInvalid={emailInvalido}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Introduzca un email válido
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button
                                    className="btn btn-block"
                                    type="submit"
                                    variant="primary"
                                >
                                    Añadir
                                </Button>
                            </div>
                        </Row>
                    </Form>
                    <hr className="hr" />
                    {listaInvitados()}
                </Modal.Body>
            </Modal>

            {/* Modal de confirmación de eliminacion de invitado de  */}
            <Modal
                show={showConfirmacionEliminar}
                onHide={() => {
                    setShowConfirmacionEliminar(false);
                }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar este invitado?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowConfirmacionEliminar(false);
                            setShowInvitados(true);
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleConfirmarEliminarInvitado}
                    >
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Evento;
