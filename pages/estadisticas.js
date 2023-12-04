import Stats from "@/components/stats";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { Button, ToggleButton, ButtonGroup, ListGroup } from "react-bootstrap";

function Estadisticas() {
	// Variable para simular la carga de datos
	const [isLoading, setLoading] = useState(false);
	const [isSexoLoading, setSexoLoading] = useState(false);
	const [isEdadLoading, setEdadLoading] = useState(false);
	const [isAsistenciaLoading, setAsistenciaLoading] = useState(false);
	const [isHoraLlegadaLoading, setHoraLlegadaLoading] = useState(false);

	// Variables para controlar los botones que han sido pulsados
	const [sexoChecked, setSexoChecked] = useState(false);
	const [edadChecked, setEdadChecked] = useState(false);
	const [asistenciaChecked, setAsistenciaChecked] = useState(false);
	const [horaLlegadaChecked, setHoraLlegadaChecked] = useState(false);

	// Función para simular la carga de datos
	useEffect(() => {
		function simularCarga() {
			return new Promise((resolve) => setTimeout(resolve, 1000));
		}

		if (isLoading) {
			simularCarga().then(() => {
				setLoading(false);
				setSexoLoading(false);
				setEdadLoading(false);
				setAsistenciaLoading(false);
				setHoraLlegadaLoading(false);
			});
		}
	}, [isLoading]);

	// Control de la pulsación de botones
	const handleClickOnSexo = () => {
		if (!sexoChecked) {
			setLoading(true);
			setSexoLoading(true);
			setSexoChecked(!sexoChecked);
		} else {
			setSexoChecked(!sexoChecked);
		}
	};

	const handleClickOnEdad = () => {
		if (!edadChecked) {
			setLoading(true);
			setEdadLoading(true);
			setEdadChecked(!edadChecked);
		} else {
			setEdadChecked(!edadChecked);
		}
	};

	const handleClickOnAsistencia = () => {
		if (!asistenciaChecked) {
			setLoading(true);
			setAsistenciaLoading(true);
			setAsistenciaChecked(!asistenciaChecked);
		} else {
			setAsistenciaChecked(!asistenciaChecked);
		}
	};

	const handleClickOnHoraLlegada = () => {
		if (!horaLlegadaChecked) {
			setLoading(true);
			setHoraLlegadaLoading(true);
			setHoraLlegadaChecked(!horaLlegadaChecked);
		} else {
			setHoraLlegadaChecked(!horaLlegadaChecked);
		}
	};

	var counter = 0;
	if (sexoChecked) {
		counter++;
	} else {
		counter--;
	}
	if (edadChecked) {
		counter++;
	} else {
		counter--;
	}
	if (horaLlegadaChecked) {
		counter++;
	} else {
		counter--;
	}
	if (asistenciaChecked) {
		counter++;
	} else {
		counter--;
	}

	return (
		<>
			<Layout></Layout>
			<h1 className="fw-bold text-center">Estadísticas de x evento</h1>
			<div class="d-flex justify-content-center pb-30">
				<ButtonGroup horizontal size="lg">
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={sexoChecked ? true : false}
						disabled={isSexoLoading}
						onClick={!isSexoLoading ? handleClickOnSexo : null}
					>
						{isSexoLoading ? "Cargando..." : "Sexo"}
					</ToggleButton>
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={edadChecked ? true : false}
						disabled={isEdadLoading}
						onClick={!isEdadLoading ? handleClickOnEdad : null}
					>
						{isEdadLoading ? "Cargando..." : "Edad"}
					</ToggleButton>
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={asistenciaChecked ? true : false}
						disabled={isAsistenciaLoading}
						onClick={
							!isAsistenciaLoading
								? handleClickOnAsistencia
								: null
						}
					>
						{isAsistenciaLoading ? "Cargando..." : "Asistencia"}
					</ToggleButton>
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={horaLlegadaChecked ? true : false}
						disabled={isHoraLlegadaLoading}
						onClick={
							!isHoraLlegadaLoading
								? handleClickOnHoraLlegada
								: null
						}
					>
						{isHoraLlegadaLoading
							? "Cargando..."
							: "Hora de llegada"}
					</ToggleButton>
				</ButtonGroup>
			</div>
			<Stats
				sexo={sexoChecked}
				edad={edadChecked}
				asistencia={asistenciaChecked}
				horaLlegada={horaLlegadaChecked}
				counter={counter}
			></Stats>
		</>
	);
}

export default Estadisticas;
