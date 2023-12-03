import Stats from "@/components/stats";
import Layout from "@/components/layout";
import { useState } from "react";
import { Button, ButtonGroup, ListGroup } from "react-bootstrap";

function Estadisticas() {
	const [sexo, setSexo] = useState(false);
	const [edad, setEdad] = useState(false);
	const [horaLlegada, setHoraLlegada] = useState(false);
	const [asistencia, setAsistencia] = useState(false);
	var counter = 0;
	if (sexo) {
		counter++;
	} else {
		counter--;
	}
	if (edad) {
		counter++;
	} else {
		counter--;
	}
	if (horaLlegada) {
		counter++;
	} else {
		counter--;
	}
	if (asistencia) {
		counter++;
	} else {
		counter--;
	}
	return (
		<>
			<Layout></Layout>
			<h1 className="fw-bold text-center">Estadísticas de x evento</h1>
			<ButtonGroup horizontal className="mb-20">
				<input
					id="btn-sexo"
					type="checkbox"
					className="text-center btn-check"
					action
					onClick={() => setSexo(!sexo)}
				/>
				<label className="btn btn-outline-primary" for="btn-sexo">
					Sexo
				</label>
				<input
					id="btn-edad"
					type="checkbox"
					className="text-center btn-check"
					action
					onClick={() => setEdad(!edad)}
				/>
				<label className="btn btn-outline-primary" for="btn-edad">
					Edad
				</label>
				<input
					id="btn-asistencia"
					type="checkbox"
					className="text-center btn-check"
					action
					onClick={() => setAsistencia(!asistencia)}
				/>
				<label className="btn btn-outline-primary" for="btn-asistencia">
					Asistencia
				</label>
				<input
					id="btn-hora-llegada"
					type="checkbox"
					className="text-center btn-check"
					action
					onClick={() => setHoraLlegada(!horaLlegada)}
				/>
				<label
					className="btn btn-outline-primary"
					for="btn-hora-llegada"
				>
					Hora de llegada
				</label>
			</ButtonGroup>
			<Stats
				sexo={sexo}
				edad={edad}
				horaLlegada={horaLlegada}
				asistencia={asistencia}
				counter={counter}
			></Stats>
		</>
	);
}

export default Estadisticas;
