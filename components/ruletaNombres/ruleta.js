import { Button, ListGroup, ProgressBar, Spinner } from "react-bootstrap";
import { userNames } from "./listaNombres";
import { useState } from "react";

function Ruleta() {
	// Lista de invitados que hay en el evento. SEGURAMENTE NO SE HAGA ASÍ (!!)
	const [invitados, setInvitados] = useState(userNames);

	// Usuarios ganadores
	const [ganadores, setGanadores] = useState([]);

	// Control de los componentes que aparecen en pantalla
	const [componentesRuleta, setComponentesRuleta] = useState({
		botonDisabled: false,
		spinnerVisible: false,
	});

	// Función para seleccionar un invitado de manera aleatoria
	let invitadoRandom;
	function getInvitadoRandom() {
		return (invitadoRandom =
			invitados[Math.floor(Math.random() * invitados.length)]);
	}

	// Conseguir ganadores aleatoriamente
	const devolverGanadores = () => {
		setComponentesRuleta({
			botonDisabled: true,
			spinnerVisible: true,
		});

		// Añadimos un retardo para seleccionar el ganador y mostrar el spinner de carga
		setTimeout(() => {
			getInvitadoRandom();

			// Añadimos un ganador aleatorio a la lista de ganadores
			setGanadores([...ganadores, invitadoRandom]);

			// Actualizamos la lista de invitados extrayendo el ganador. SEGURAMENTE NO SE HAGA ASÍ (!!)
			const actualizarLista = invitados.filter(
				(ganador) => ganador !== invitadoRandom
			);

			setInvitados(actualizarLista);

			// Volvemos a habilitar el botón y ocultamos el spinner
			setComponentesRuleta({
				botonDisabled: false,
				spinnerVisible: false,
			});
		}, 3000);
		//getInvitadoRandom();
	};

	return (
		<>
			<div className="listar-invitados d-flex justify-content-center align-items-center">
				{/*Sacamos por pantalla los invitados participantes del sorteo. Habrá que pensar otra manera (!!) */}
				<ListGroup id="userList" horizontal>
					{invitados.map((invitado, index) => (
						<ListGroup.Item className="lista-invitados" key={index}>
							{invitado}
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>
			<hr />
			{/*Mostramos el Spinner para simular un tiempo de carga*/}
			<div className="componentes d-flex justify-content-center align-items-center">
				<div>
					{componentesRuleta.spinnerVisible && (
						<Spinner animation="border" variant="primary" />
					)}
				</div>
			</div>
			{/*Botón para extraer los ganadores del sorteo*/}
			<div className="componentes d-flex justify-content-center align-items-center">
				<Button
					onClick={devolverGanadores}
					disabled={componentesRuleta.botonDisabled}
				>
					Generar ganador
				</Button>
			</div>
			<div className="listar-ganadores d-flex justify-content-center align-items-center mt-4">
				{/*Sacamos por pantalla los ganadores del sorteo.*/}
				<ListGroup id="userList" horizontal>
					{ganadores.map((ganador, index) => (
						<ListGroup.Item
							className="lista-ganadores"
							key={index}
							variant="warning"
						>
							{ganador}
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>
		</>
	);
}

export default Ruleta;
