import Stats from "@/components/stats";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { ToggleButton, ButtonGroup, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { getDoc } from "firebase/firestore";

function Estadisticas() {
	const router = useRouter()
	// Variable para simular la carga de datos
	const [isLoading, setLoading] = useState(false);

	// Variables para controlar los botones que han sido pulsados
	const [sexoChecked, setSexoChecked] = useState(false);
	const [edadChecked, setEdadChecked] = useState(false);
	const [asistenciaChecked, setAsistenciaChecked] = useState(false);
	const [horaLlegadaChecked, setHoraLlegadaChecked] = useState(false);

	// Variable contador para gestionar las estadísticas
	const [counter, setCounter] = useState(0);

	// Función para simular la carga de datos
	useEffect(() => {
		function simularCarga() {
			return new Promise((resolve) => setTimeout(resolve, 1000));
		}

		if (isLoading) {
			simularCarga().then(() => {
				setLoading(false);
			});
		}
	}, [isLoading]);

	// Control de la pulsación de botones
	const handleClickOnSexo = () => {
		if (!sexoChecked) {
			setLoading(true);
			setSexoChecked(!sexoChecked);
			setCounter(counter+1);
		} else {
			setSexoChecked(!sexoChecked);
			setCounter(counter-1);
		}
	};

	const handleClickOnEdad = () => {
		if (!edadChecked) {
			setLoading(true);
			setEdadChecked(!edadChecked);
			setCounter(counter+1);
		} else {
			setEdadChecked(!edadChecked);
			setCounter(counter-1);
		}
	};

	const handleClickOnAsistencia = () => {
		if (!asistenciaChecked) {
			setLoading(true);
			setAsistenciaChecked(!asistenciaChecked);
			setCounter(counter+1);
		} else {
			setAsistenciaChecked(!asistenciaChecked);
			setCounter(counter-1);
		}
	};

	const handleClickOnHoraLlegada = () => {
		if (!horaLlegadaChecked) {
			setLoading(true);
			setHoraLlegadaChecked(!horaLlegadaChecked);
			setCounter(counter+1);
		} else {
			setHoraLlegadaChecked(!horaLlegadaChecked);
			setCounter(counter-1);
		}
	};

	return (
		<>
			<Layout></Layout>
			<h1 className="fw-bold text-center">Estadísticas de {router.query.id} evento</h1>
			<div class="d-flex justify-content-center pb-30">
				<ButtonGroup horizontal size="lg">
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={sexoChecked ? true : false}
						disabled={isLoading}
						onClick={!isLoading ? handleClickOnSexo : null}
					>
						Sexo
					</ToggleButton>
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={edadChecked ? true : false}
						disabled={isLoading}
						onClick={!isLoading ? handleClickOnEdad : null}
					>
						Edad
					</ToggleButton>
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={asistenciaChecked ? true : false}
						disabled={isLoading}
						onClick={!isLoading ? handleClickOnAsistencia : null}
					>
						Asistencia
					</ToggleButton>
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={horaLlegadaChecked ? true : false}
						disabled={isLoading}
						onClick={!isLoading ? handleClickOnHoraLlegada : null}
					>
						Hora de llegada
					</ToggleButton>
				</ButtonGroup>
			</div>
				{!isLoading ? <Stats sexo={sexoChecked}
								edad={edadChecked}
								asistencia={asistenciaChecked}
								horaLlegada={horaLlegadaChecked}
								counter={counter}></Stats> : 
								<div class="d-flex justify-content-center pb-30">
									<Spinner></Spinner>
								</div>
				}
								
		</>
	);
}

export default Estadisticas;
