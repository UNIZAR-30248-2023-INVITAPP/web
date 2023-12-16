import Stats from "@/components/stats";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { ToggleButton, ButtonGroup, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../../firebase";

function Estadisticas() {
	// Variable redirección por Router
	const router = useRouter()
	// Variable para simular la carga de datos
	const [isLoading, setLoading] = useState(false);

	// Variables para controlar los botones que han sido pulsados
	const [generoChecked, setGeneroChecked] = useState(false);
	const [edadChecked, setEdadChecked] = useState(false);
	const [asistenciaChecked, setAsistenciaChecked] = useState(false);
	const [horaLlegadaChecked, setHoraLlegadaChecked] = useState(false);

	// Variable contador para gestionar las estadísticas
	const [counter, setCounter] = useState(0);

	// Gestión de invitados
	const [invitados, setInvitados] = useState([]);

	// Variables para recuperar el nombre y fecha del evento pulsado
	const [nombreEvento, setNombreEvento] = useState("");
	const [fechaEvento, setFechaEvento] = useState("");

	// TEMPORAL
	const [num, setNum] = useState(0);

	const randomNumberInRange = (min, max) => { 
        return Math.floor(Math.random()  
                * (max - min + 1)) + min; 
    }; 

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

	
	const fetchData = async() => {
		const evento = await getDoc(doc(db, "Eventos/" + router.query.id));
		const nombre = evento._document.data.value.mapValue.fields.nombre.stringValue;
		const fechaDate = new Date(evento._document.data.value.mapValue.fields.fecha.stringValue);
		const fecha = fechaDate.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
		setNombreEvento(nombre);
		setFechaEvento(fecha);
		//...
		const invitadosFirebase = await getDocs(collection(db, "Eventos/" + router.query.id + "/Invitados"))
		const invitadosEventoPrueba = invitadosFirebase.docs.map((i) => {
			if(i._document.data.value.mapValue.fields.asistido.booleanValue){
				return {
					nombre: i._document.data.value.mapValue.fields.nombre.stringValue,
					DNI: i._document.data.value.mapValue.fields.DNI.stringValue,
					email: i._document.data.value.mapValue.fields.email.stringValue,
					genero: i._document.data.value.mapValue.fields.genero.stringValue,
					edad: randomNumberInRange(18, 24), // ACABARÁ SIENDO -> i._document.data.value.mapValue.fields.loquesea.timestampValue, 
					asistencia: i._document.data.value.mapValue.fields.asistido.booleanValue,
					horaLlegada: i._document.data.value.mapValue.fields.hora_asistido.timestampValue
				}
			}
			else{
				return {
					nombre: i._document.data.value.mapValue.fields.nombre.stringValue,
					DNI: i._document.data.value.mapValue.fields.DNI.stringValue,
					email: i._document.data.value.mapValue.fields.email.stringValue,
					genero: i._document.data.value.mapValue.fields.genero.stringValue,
					edad: randomNumberInRange(18, 24),
					asistencia: i._document.data.value.mapValue.fields.asistido.booleanValue,
				}
			}
		})
		setInvitados([...invitadosEventoPrueba]);
	}

	useEffect(() => {
		fetchData();
	}, [])

	// Control de la pulsación de botones
	const handleClickOnGenero = () => {
		if (!generoChecked) {
			setLoading(true);
			setGeneroChecked(!generoChecked);
			setCounter(counter+1);
		} else {
			setGeneroChecked(!generoChecked);
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
		<Layout>
			<h1 className="fw-bold text-center py-4">Estadísticas de {nombreEvento} del {fechaEvento}</h1>
			<div className="d-flex justify-content-center">
				<button
					className="my-2 btn btn-outline-dark btn-lg" 
					variant="outline-primary"
					onClick={() => fetchData()}
				>Actualizar</button>
			</div>
			<div className="d-flex justify-content-center">
				<ButtonGroup horizontal="true" size="lg">
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={generoChecked ? true : false}
						disabled={isLoading}
						onClick={!isLoading ? handleClickOnGenero : null}
					>
						Genero
					</ToggleButton>
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={edadChecked ? true : false}
						disabled={isLoading || horaLlegadaChecked}
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
						disabled={isLoading || edadChecked}
						onClick={!isLoading ? handleClickOnHoraLlegada : null}
					>
						Hora de llegada
					</ToggleButton>
				</ButtonGroup>
			</div>
				{!isLoading ? <Stats generoChecked={generoChecked}
								edadChecked={edadChecked}
								asistenciaChecked={asistenciaChecked}
								horaLlegadaChecked={horaLlegadaChecked}
								counter={counter}
								invitados={invitados}
								></Stats> : 
								<div className="d-flex justify-content-center py-4">
									<Spinner></Spinner>
								</div>
				}
								
		</Layout>
	);
}

export default Estadisticas;
