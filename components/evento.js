// Evento.js

import React, { useState } from "react";
import {
	Modal,
	ListGroup,
	Form,
	Button,
	Row,
	Col,
	ToastContainer,
} from "react-bootstrap";
import db from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Ruleta from "./ruleta";
import Toast from "react-bootstrap/Toast";

function Evento({
	id,
	nombre,
	fecha,
	hora,
	ubicacion,
	invitados,
	onEliminar,
	onCambio,
	onSelectEvento,
	Seleccionado
}) {
	const [invitadosArray, setInvitados] = useState(invitados);
	const [emailInvalido, setEmailInvalido] = useState(false);
	const [nombreInvalido, setNombrelInvalido] = useState(false);
	const [DNIInvalido, setDNIInvalido] = useState(false);
	const [invitadoExistente, setInvitadoExistente] = useState(false);
	const [showInvitados, setShowInvitados] = useState(false);
	const [showSorteo, setShowSorteo] = useState(false);
	const [showConfirmacionEliminar, setShowConfirmacionEliminar] =
		useState(false);
	const [indexInvitadoEliminar, setIndexInvitadoEliminar] = useState(null);
	//const [showToastEliminarInvitado, setShowToastEliminarInvitado] =
	//	useState(false);

	// Funcion que dado un DNI, devuelve true si es valido
	// y false si no
	// Se entiende que un DNI es valido si tiene una estructura:
	// DDDDDDDDL si es NIF - o - LDDDDDDDL si es NIE
	// donde D es un digito y L una letra
	const validarDNI = (DNI) => {
		// Validar DNI
		var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
		var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
		DNI = DNI.toUpperCase();
		if (!nifRexp.test(DNI) && !nieRexp.test(DNI)) {
			return false;
		}

		return true;
	};

	// Funcion que maneja el evento submit del formulario de añadir invitado
	// Comprueba que los campos no esten vacios, que el DNI sea valido
	// En caso satisfactorio añade el invitado a Firebase
	// En caso contrario muestra el mensaje de error correspondiente
	const handleSubmitAnadirInvitado = async (event) => {
		setNombrelInvalido(false);
		setDNIInvalido(false);
		setEmailInvalido(false);
		event.preventDefault();
		const nombre = event.target.formNombre.value;
		const DNI = event.target.formDNI.value;
		const email = event.target.formEmail.value;
		// Valido el dni
		if (validarDNI(DNI) === true) {
			console.log({ nombre, DNI, email });
		} else {
			setDNIInvalido(true);
			return;
		}
		// Compruebo si existe un invitado con ese DNI
		if (invitadosArray.find((i) => i.DNI === DNI) != undefined) {
			setInvitadoExistente(true);
			return;
		}
		// Añado el invitado a firebase
		try {
			const res = await updateDoc(doc(db, "Eventos", id), {
				invitados: [
					...invitados,
					{
						nombre: nombre,
						email: email,
						DNI: DNI,
					},
				],
			});
			// Actualizo mis invitados
			setInvitados([
				...invitadosArray,
				{
					nombre: nombre,
					email: email,
					DNI: DNI,
				},
			]);
			//
			event.target.formNombre.value = null;
			event.target.formDNI.value = null;
			event.target.formEmail.value = null;
			setInvitadoExistente(false);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	// Funcion que maneja el evento del boton Eliminar de un invitado
	// Lanza un modal para confirmar la eliminacion del invitado
	const handleEliminarInvitado = async (index) => {
		setIndexInvitadoEliminar(index);
		setShowInvitados(false);
		setShowConfirmacionEliminar(true);
	};

	// Funcion que maneja el evento del boton Confirmar del modal de
	// confirmacion de eliminacion de invitado
	// Actualiza la lista de invitados y actualiza los invitados en Firebase
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
		setShowToastEliminarInvitado(true);
	};

	// Componente visual de la lista de invitados
	// Si la longitud del array de invitados es 0 muestra un mensaje
	// En caso contrario muestra para cada invitado su informacion y un boton de eliminar
	const listaInvitados = () => {
		if (invitadosArray?.length > 0) {
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
											DNI/NIE:{" "}
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
			{/* Modal de listado de invitados */}
			<Modal
				className="pt-2 px-2 pt-md-0 px-md-0"
				show={showInvitados}
				onHide={() => {
					setNombrelInvalido(false);
					setDNIInvalido(false);
					setEmailInvalido(false);
					setInvitadoExistente(false);
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
								md="7"
								className="mb-3"
								controlId="formNombre"
							>
								<Form.Label>Nombre completo</Form.Label>
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
								md="5"
								className="mb-3"
								controlId="formDNI"
							>
								<Form.Label>DNI/NIE</Form.Label>
								<Form.Control
									type="text"
									placeholder="Introduzca DNI/NIE"
									required
									isInvalid={DNIInvalido}
								/>
								<Form.Control.Feedback type="invalid">
									DNI o NIE invalido
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
							{invitadoExistente && (
								<p className="text-center text-danger">
									Ya existe un invitado con ese DNI
								</p>
							)}
							<div className="d-grid gap-2">
								<Button
									className="btn btn-dark btn-block"
									type="submit"
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

			{/* Modal del sorteo*/}
			<Modal
				className="pt-2 px-2 pt-md-0 px-md-0"
				show={showSorteo}
				onHide={() => {
					setShowSorteo(false);
				}}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Sorteo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Ruleta listaInvitados={invitadosArray} />
				</Modal.Body>
			</Modal>

			{/* Modal de confirmación de eliminacion de invitado */}
			<Modal
				id="modalConfirmarEliminacion"
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
					¿Estás seguro de que quieres eliminar al invitado{" "}
					<b>{invitadosArray[indexInvitadoEliminar]?.nombre}</b> con
					DNI/NIE: <b>{invitadosArray[indexInvitadoEliminar]?.DNI}</b>
					?
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

			{/* Toast para informar al usuario de la eliminación de un usuario */}
			{/* <ToastContainer position="bottom-center">
				<Toast
					onClose={() => setShowToastEliminarInvitado(false)}
					show={showToastEliminarInvitado}
					bg={"success"}
					delay={3000}
					autohide
				>
					<Toast.Body className="text-white">
						Se eliminó al usuario {invitadosArray[indexInvitadoEliminar]} correctamente
					</Toast.Body>
				</Toast>
			</ToastContainer> */}
			<li className="mb-4 list-group-item border border-2 rounded col-12 col-lg-8 mx-auto">
				<div className="d-flex flex-column py-2 flex-md-row gap-3 justify-content-between align-items-center">

					<input
						type="checkbox"
						className="form-check-input border-2"
						onChange={onSelectEvento} // Manejador para marcar/desmarcar evento
					/>
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
							Invitados
						</button>

						{/* Botón de ver sorteos  */}
						<button
							className="btn btn-secondary" // Estilo de botón primario
							onClick={() => {
								setShowSorteo(true);
							}}
						>
							{" "}
							Sorteo
						</button>

						{/* Botón de modificar a la derecha */}
						<button
							className="btn btn-block btn-warning" // Estilo de botón de modificación
							onClick={onCambio} // Manejador para modificar el evento por índice
						>
							{" "}
							Modificar
						</button>

						{/* Botón de eliminación a la derecha */}
						<button
							className={`btn btn-danger ${Seleccionado ? 'disabled' : ''}`} // Estilo de botón de eliminación
							onClick={onEliminar} // Manejador para eliminar el evento por índice
						>
							{" "}
							Eliminar
						</button>
					</div>
				</div>
			</li>
		</>
	);
}

export default Evento;
