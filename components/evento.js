// Evento.js

import React, { useEffect, useState } from "react";
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
import { doc, collection, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import Ruleta from "./ruleta";
import Toast from "react-bootstrap/Toast";
import ModalGenerico from "./modalGenerico";

function Evento({
	id,
	nombre,
	fecha,
	hora,
	ubicacion,
	invitados,
	onEliminar,
	onCambio,
	onEstadisticas,
	Seleccionado,
	onSelectEvento,
	setUsuariosPendientesCorreo,
	quitarUsuariosPendientesCorreo,
}) {
	//const [invitadosArray, setInvitados] = useState(invitados);
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
	const [invitadosAEliminar, setInvitadosAEliminar] = useState([])
	const [showConfirmBorradoMultiple, setShowConfirmBorradoMultiple] = useState(false)
	//UseState de mostrar mensaje de exito al crear un invitado
	const [showExitoAgnadirInvitado, setShowExitoAgnadirInvitado] = useState(false)
	//UseState de mostrar mensaje de exito al eliminar un invitado
	const [showExitoEliminarInvitado, setShowExitoEliminarInvitado] = useState(false)
	//UseState de mostrar mensaje de exito al eliminar un invitado
	const [showErrorAgnadirInvitado, setShowErrorAgnadirInvitado] = useState(false)

	const [modificandoInvitado, setModificandoInvitado] = useState(false)
	const [indexInvitadoModificar, setIndexInvitadoModificar] = useState(null);

	//useEffect(()=>{setInvitadosAEliminar(invitadosAEliminar.add("12345678A"))},[])
	//const [showToastEliminarInvitado, setShowToastEliminarInvitado] =
	//	useState(false);

	// Funcion que dado un DNI, devuelve true si es valido
	// y false si no
	// Se entiende que un DNI es valido si tiene una estructura:
	// DDDDDDDDL si es NIF - o - LDDDDDDDL si es NIE
	// donde D es un digito y L una letra
	const validarDNI = (DNI) => {
		// Validar DNI
		var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
		var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
		var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
		DNI = DNI.toUpperCase();
		if (!nifRexp.test(DNI) && !nieRexp.test(DNI)) {
			return false;
		}

		var nie = DNI
		.replace(/^[X]/, '0')
		.replace(/^[Y]/, '1')
		.replace(/^[Z]/, '2');

		var letter = DNI.substr(-1);
		var charIndex = parseInt(nie.substr(0, 8)) % 23;

 		if (validChars.charAt(charIndex) === letter) return true;

		return false;
	};

	// Funcion que maneja el evento submit del formulario de añadir invitado
	// Comprueba que los campos no esten vacios, que el DNI sea valido
	// En caso satisfactorio añade el invitado a Firebase
	// En caso contrario muestra el mensaje de error correspondiente
	const handleSubmitAnadirInvitado = async (event) => {
		setNombrelInvalido(false);
		setDNIInvalido(false);
		setEmailInvalido(false);
		setShowErrorAgnadirInvitado(false);
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
		// Si estoy modificando invitado
		if (modificandoInvitado){
			// Compruebo si existe un invitado con ese DNI diferente a si mismo
			const i = invitadosArray.findIndex((i) => i.DNI === DNI)
			if (i != indexInvitadoModificar && i != -1){
				setInvitadoExistente(true);
				return;
			}
		}
		// Si estoy creando invitado
		else {
			// Compruebo si existe un invitado con ese DNI
			if (invitadosArray.find((i) => i.DNI === DNI) != undefined) {
				setInvitadoExistente(true);
				return;
			}
		}
		// Añado el invitado a firebase
		try {
			// Si estoy modificando invitado
			if (modificandoInvitado){
				await updateDoc(doc(db, "Eventos/" + id + "/Invitados/" + invitadosArray.at(indexInvitadoModificar).docId), 
				{
					nombre: nombre,
					email: email,
					DNI: DNI.toUpperCase(),
				})
				const nuevosInvitados = [...invitadosArray]
				nuevosInvitados[indexInvitadoModificar].nombre = nombre
				nuevosInvitados[indexInvitadoModificar].email = email
				nuevosInvitados[indexInvitadoModificar].DNI = DNI.toUpperCase()
				setInvitados([...nuevosInvitados])
			}
			// Si estoy creando invitado
			else {
				const docRef = await addDoc(collection(db, "Eventos/" + id + "/Invitados"), 
				{
					nombre: nombre,
					email: email,
					DNI: DNI.toUpperCase(),
				})
				// Actualizo mis invitados
				setInvitados([
					...invitadosArray,
					{
						docId: docRef.id,
						nombre: nombre,
						email: email,
						DNI: DNI.toUpperCase(),
					},
				]);
			}
			//
			event.target.formNombre.value = null;
			event.target.formDNI.value = null;
			event.target.formEmail.value = null;
			setInvitadoExistente(false);
			//Establcecemos mensaje de exito de crear invitado
			setShowInvitados(false);
			setModificandoInvitado(false);
			setShowExitoAgnadirInvitado(true);
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

	const handleEliminarEvento = () => {
		onEliminar();
		setUsuariosPendientesCorreo(invitadosArray, nombre, fecha, id);
	};

	const handleModificarInvitado = (index) => {
		setIndexInvitadoModificar(index)
		setModificandoInvitado(true)
	}

	const handleSelectEvento = () => {
		const eventIsSelected = onSelectEvento();
		if (eventIsSelected) {
			quitarUsuariosPendientesCorreo(id);
		} else {
			setUsuariosPendientesCorreo(invitadosArray, nombre, fecha, id);
		}
	};

	// Funcion que maneja el evento del boton Confirmar del modal de
	// confirmacion de eliminacion de invitado
	// Actualiza la lista de invitados y actualiza los invitados en Firebase
	const handleConfirmarEliminarInvitado = async () => {
		if (indexInvitadoEliminar === null) return;
		const nuevosInvitados = [...invitadosArray];
		nuevosInvitados.splice(indexInvitadoEliminar, 1);
		try {
			await deleteDoc(doc(db, "Eventos/" + id + "/Invitados/" + invitadosArray[indexInvitadoEliminar].docId))
			// Actualizo mis invitados
			setInvitados([...nuevosInvitados]);
			//
			//Mostrar mensaje de exito al eliminar
			setShowExitoEliminarInvitado(true);

		} catch (e) {
			console.error("Error adding document: ", e);
		}
		setIndexInvitadoEliminar(null);
		setShowConfirmacionEliminar(false);
		// setShowToastEliminarInvitado(true);
	};

	// Componente visual de la lista de invitados
	// Si la longitud del array de invitados es 0 muestra un mensaje
	// En caso contrario muestra para cada invitado su informacion y un boton de eliminar
	const listaInvitados = () => {
		if (invitadosArray?.length > 0) {
			return (
				<div className="d-flex flex-column gap-3">
					<Button disabled={(invitadosAEliminar.length == 0)} className="btn btn-danger btn-block" 
					onClick={()=>{
						setShowInvitados(false);
						setShowConfirmBorradoMultiple(true)}
						}>
						Eliminar invitados seleccionados</Button>
					<ListGroup>
						{invitadosArray.map((invitado, index) => {
							return (
								<ListGroup.Item key={invitado.DNI}>
									<div className="d-flex flex-column flex-md-row gap-2 justify-content-between ">
										<div className="d-flex flex-column gap-2 flex-md-row justify-content-between align-items-center">
											<input
												type="checkbox"
												className="form-check-input border-2"
												onChange={() => {
													if (invitadosAEliminar.includes(invitado.DNI)) {
														console.log("eliminando")
														setInvitadosAEliminar(invitadosAEliminar.filter((i)=>i != invitado.DNI))
													}
													else {
														console.log("añadiendo")
														setInvitadosAEliminar([...invitadosAEliminar, invitado.DNI])
													}
												}} // Manejador para marcar/desmarcar invitado
											/>
											
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
										</div>
										<div className="d-flex flex-column flex-md-row flex-md-row gap-2 justify-content-between ">
											{/* Botón de modificar a la derecha */}
											<div className="d-grid my-auto d-md-inline gap-2">
												<button
														className="my-2 btn btn-warning" 
														onClick={() => {handleModificarInvitado(index)}} 
													>
													{" "}
													Modificar
												</button>
											</div>

											{/* Botón de eliminación a la derecha */}
											<div className="d-grid my-auto d-md-inline gap-2">
												<button
													className="my-2 btn btn-danger"
													onClick={() => {handleEliminarInvitado(index)}}
												>
													{" "}
													Eliminar
												</button>
											</div>
										</div>
									</div>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</div>
			);
		} else
			return (
				<span className="fw-bold d-block mt-1 text-center">
					Aun no hay invitados para este evento
				</span>
			);
	};

	const handleEliminarInvitadoMultiple = async () => {
		if (invitadosAEliminar.length == 0) return;
		const nuevosInvitados = [...invitadosArray].filter((i) => !invitadosAEliminar.includes(i.DNI))
		const docsRefsEliminar = [...invitadosArray].filter((i) => invitadosAEliminar.includes(i.DNI)).map((i) => i.docId)
		console.log(docsRefsEliminar)
		console.log(nuevosInvitados)
		try {
			await (docsRefsEliminar.forEach(async (docId) => {
				await deleteDoc(doc(db, "Eventos/" + id + "/Invitados/" + docId))
			}));
			// Actualizo mis invitados
			setInvitados([...nuevosInvitados]);
			//
		} catch (e) {
			console.error("Error adding document: ", e);
		}
		setShowConfirmBorradoMultiple(false)
		setShowInvitados(true)
	}

	return (
		<>
			{/* Modal de listado de invitados */}
			<Modal
				id={`modalListaInvitados-${id}`}
				className="modal-lg pt-2 px-2 pt-md-0 px-md-0"
				show={showInvitados}
				onEnter={()=>{
					setModificandoInvitado(false)
					setIndexInvitadoModificar(null);
					setInvitadosAEliminar([]);
				}}
				onHide={() => {
					setNombrelInvalido(false);
					setDNIInvalido(false);
					setEmailInvalido(false);
					setInvitadoExistente(false);
					setShowInvitados(false);
					setShowErrorAgnadirInvitado(false);//Quitamos mensaje
					setTimeout(() => {
						setModificandoInvitado(false)
						setIndexInvitadoModificar(null)
					}, 200);
				}}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Lista de invitados</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmitAnadirInvitado}
						onReset={(e) =>{
							setModificandoInvitado(false)
							setIndexInvitadoModificar(null)
							e.target.formNombre.value =  "";
							e.target.formDNI.value = "";
							e.target.formEmail.value = "";
						}}>
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
									defaultValue={modificandoInvitado ? invitadosArray?.at(indexInvitadoModificar)?.nombre : ""}
									required
									isInvalid={nombreInvalido}
									onInvalid={() => setShowErrorAgnadirInvitado(true)}
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
									defaultValue={modificandoInvitado ? invitadosArray?.at(indexInvitadoModificar)?.DNI : ""}
									required
									isInvalid={DNIInvalido}
									onInvalid={() => setShowErrorAgnadirInvitado(true)}
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
								<Form.Label>Correo eletrónico</Form.Label>
								<Form.Control
									type="email"
									placeholder="Introduzca correo electrónico"
									defaultValue={modificandoInvitado ? invitadosArray?.at(indexInvitadoModificar)?.email : ""}
									required
									isInvalid={emailInvalido}
									onInvalid={() => setShowErrorAgnadirInvitado(true)}
								/>
								<Form.Control.Feedback type="invalid">
									Introduzca un correo electrónico válido
								</Form.Control.Feedback>
							</Form.Group>
							{invitadoExistente && (
								<p className="text-center text-danger">
									Ya existe un invitado con ese DNI
								</p>
							)}
							{ showErrorAgnadirInvitado && !nombreInvalido && !DNIInvalido && !emailInvalido && (
								<p className="text-center text-danger">
									Todos los campos son obligatorios
								</p>
							)}
							<div className="d-grid gap-2">
								<Button
									className = {`btn btn-block ${modificandoInvitado ? "btn-success" : "btn-dark"}`}
									type="submit"
								>
									{modificandoInvitado ? "Guardar" : "Añadir"}
								</Button>
								{modificandoInvitado &&
									<Button
									className = "btn btn-block btn-danger"
									type="reset"
									>
										Cancelar
									</Button>
								}
							</div>
						</Row>
					</Form>
					<hr className="hr" />
					{listaInvitados()}
				</Modal.Body>
			</Modal>

			{/* Modal de mensaje de exito al añadir invitado */}
			<ModalGenerico
				id="modalExitoAgnadirInvitado"
				show={showExitoAgnadirInvitado}
				titulo="Invitado añadido"
				cuerpo="El invitado se ha añadido correctamente"
				onHide={() => {setShowExitoAgnadirInvitado(false); setShowInvitados(true);}}
			/>
			{/* ------------------------------------------------------- */}

			{/* Modal de mensaje de exito al eliminar invitado */}
			<ModalGenerico
				id="modalExitoAgnadirInvitado"
				show={showExitoEliminarInvitado}
				titulo="Invitado eliminado"
				cuerpo="El invitado se ha eliminado correctamente"
				onHide={() => {setShowExitoEliminarInvitado(false); setShowInvitados(true);}}
			/>
			{/* ------------------------------------------------------- */}


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
					<Ruleta
						listaInvitados={invitadosArray}
						nombreEvento={nombre}
					/>
				</Modal.Body>
			</Modal>

			{/* Modal de confirmación de eliminacion de invitado */}
			<Modal
				id="modalConfirmarEliminacion"
				show={showConfirmacionEliminar}
				onHide={() => {
					setShowConfirmacionEliminar(false);
					setShowInvitados(true);
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

			{/* Modal de confirmación borrado múltiple de invitados */}
			<ModalGenerico
							id="modalConfirmacionEliminarInvitadoMultiple"
							show={showConfirmBorradoMultiple}
							titulo="Borrar los invitados seleccionados"
							cuerpo="¿Está seguro de que desea eliminar los invitados seleccionados?"
							onHide={() => {setShowInvitados(true);setShowConfirmBorradoMultiple(false)}}
							onEliminar={() => handleEliminarInvitadoMultiple()}
						/>

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
            <li className="mb-4 list-group-item border border-2 rounded col-12 col-lg-11 mx-auto">
                <div className="d-flex flex-column py-2 flex-lg-row gap-3 justify-content-between ">
                        <input
                            type="checkbox"
                            id={`checkbox-${id}`}
                            className="form-check border-2"
                            onChange={handleSelectEvento} // Manejador para marcar/desmarcar evento
                            checked={Seleccionado}
                        />
                    <div className="d-flex flex-column justify-content-between align-items-center">
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
                    </div>

                    <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
                        {/* Botón de ver invitados a la derecha */}
                        <div className="d-grid my-auto d-lg-inline gap-2">
                            <button
                                className="btn btn-primary" // Estilo de botón primario
                                onClick={() => {
                                    setShowInvitados(true);
                                }}
                            >
                                {" "}
                                Invitados
                            </button>
                        </div>

                        {/* Botón de ver sorteos  */}
                        <div className="d-grid my-auto d-lg-inline gap-2">
                            <button
                                className="btn btn-secondary" // Estilo de botón primario
                                onClick={() => {
                                    setShowSorteo(true);
                                }}
                            >
                                {" "}
                                Sorteo
                            </button>
                        </div>

                        {/* Botón de modificar a la derecha */}
                        <div className="d-grid my-auto d-lg-inline gap-2">
                            <button
                                className="btn btn-block btn-warning" // Estilo de botón de modificación
                                onClick={onCambio} // Manejador para modificar el evento por índice
                            >
                                {" "}
                                Modificar
                            </button>
                        </div>

						{/* Botón de eliminación a la derecha */}
                        <div className="d-grid my-auto d-lg-inline gap-2">
                            <button
                                className={`btn btn-danger ${Seleccionado ? 'disabled' : ''}`} // Estilo de botón de eliminación
                                onClick={handleEliminarEvento} // Manejador para eliminar el evento por índice
                            >
                                {" "}
                                Eliminar
                            </button>
                        </div>
                        
                        {/* Botón de eliminación a la derecha */}
                        <div className="d-grid my-auto d-lg-inline gap-2">
                            <button
                              className="btn btn-block btn-info" // Estilo de botón de estadísticas
                              onClick={onEstadisticas} // Manejador para abrir el modal correspondiente a las estadísticas
                            >
                              Estadisticas
                            </button>
                        </div>
					</div>
				</div>
			</li>
		</>
	);
}

export default Evento;
