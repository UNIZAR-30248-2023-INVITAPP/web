import MostrarGraficaConjunta from "./mostrarGraficaConjunta";
import MostrarGrafica from "./mostrarGrafica";

const Stats = ({ sexoChecked, edadChecked, asistenciaChecked, horaLlegadaChecked, counter, invitados }) => {

	console.log(invitados);

	// Función para contabilizar elementos en un vector
	function contabilizarElemento(elemento, array) {
		var counter = 0;
		// Si el elemento buscado se encuentra en el array, se incrementa la variable counter
		array.forEach(i => {
			if(i==elemento){
				counter++;
			}
		})
		return counter;
	}
	
	// Arrays de edades segun sexo
	const edadesMasculino = []
	const edadesFemenino = []
	const edadesOtro = []

	// Arrays de asistencias segun edad
	const hanAsistidoEdad = []
	const noHanAsistidoEdad = []

	// Arrays de horas segun sexo
	const horaLlegadaMasculino = []
	const horaLlegadaFemenino = []
	const horaLlegadaOtro = []

	// Variables de contadores de sexo
	var counterMasculino = 0;
	var counterFemenino = 0;
	var counterOtro = 0;

	// Variables de contadores de asistencia según sexo
	var counterAsistenciaMasculino = 0;
	var counterAsistenciaFemenino = 0;
	var counterAsistenciaOtro = 0;

	// Array que contiene las diferentes edades de los invitados
	const totalEdades = []

	// Recorro el conjunto de invitados
	invitados.forEach(i => {
		// Creamos una variable para ver si la edad del invitado está incluida en el vector totalEdades
		var edadEncontrada = false;
		// Si la edad del invitado ya está incluida cambiamos la variable a true
		totalEdades.forEach(j => {
			if(j==i.edad){
				edadEncontrada = true;
			}
		})
		// Si no está incluida, la añadimos al vector totalEdades
		if(!edadEncontrada){
			totalEdades.push(i.edad);
		}
		// Si el invitado es de sexo masculino
		if(i.sexo == "Masculino"){
			// Se aumenta el contador de invitados masculino
			counterMasculino++;
			// Añade su edad al vector edadesMasculino
			edadesMasculino.push(i.edad);
			// Si ha asistido se incrementa el contador de asistencia masculino
			// y se añade al vector hanAsistidoEdad
			if(i.asistencia){
				counterAsistenciaMasculino++;
				hanAsistidoEdad.push(i.edad);
			}
			// Si no ha asistido se añade al vector noHanAsistidoEdad
			else{
				noHanAsistidoEdad.push(i.edad);
			}
		}
		// Si el invitado es de sexo femenino
		else if(i.sexo == "Femenino"){
			// Se aumenta el contador de invitados femenino
			counterFemenino++;
			// Añade su edad al vector edadesFemenino
			edadesFemenino.push(i.edad);
			// Si ha asistido se incrementa el contador de asistencia femenino
			// y se añade al vector hanAsistidoEdad
			if(i.asistencia){
				counterAsistenciaFemenino++;
				hanAsistidoEdad.push(i.edad);
			}
			// Si no ha asistido se añade al vector noHanAsistidoEdad
			else{
				noHanAsistidoEdad.push(i.edad);
			}
		}
		else{
			// Se aumenta el contador de invitados otro
			counterOtro++;
			// Añade su edad al vector edadesOtro
			edadesOtro.push(i.edad);
			// Si ha asistido se incrementa el contador de asistencia otro
			// y se añade al vector hanAsistidoEdad
			if(i.asistencia){
				counterAsistenciaOtro++;
				hanAsistidoEdad.push(i.edad);
			}
			// Si no ha asistido se añade al vector noHanAsistidoEdad
			else{
				noHanAsistidoEdad.push(i.edad);
			}
		}
	})

	console.log(totalEdades);
	console.log(edadesMasculino);
	console.log(edadesFemenino);
	console.log(edadesOtro);

	// Si no ha seleccionado ninguna de las variables
	if (counter==0) {
		return (
			<div className="d-flex justify-content-center py-4">
				<h2 className="mt-8">
					Selecciona al menos una de las variables
				</h2>
			</div>
		);
	} 
	// Si han seleccionado más de dos variables
	else if (counter > 2) {
		return (
			<div className="d-flex justify-content-center py-4">
				<h2 className="mt-8">Debes seleccionar solo dos variables</h2>
			</div>
		);
	} 
	// Si se ha seleccionado una o dos variables
	else {
		if (sexoChecked) {
			if (edadChecked) {
				// Datos para las variables conjuntas sexo y edad
				const data = [
					["Edad", "Masculino", "Femenino", "Otro"],
				];

				// Se contabilizan los invitados segun sexo y edad
				totalEdades.forEach(i =>{
					data.push([i, contabilizarElemento(i, edadesMasculino), contabilizarElemento(i, edadesFemenino), contabilizarElemento(i, edadesOtro)]);
				})
					
				// Opciones para los gráficos
				const options = {
					chartArea: { width: "100%" },
				};
				
				//Opciones para el gráfico de barras horizontal
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					bars: "horizontal",
				};

				// Opciones para el gráfico de barras apiladas*/
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					}
				};
				return (
					<>
						<MostrarGraficaConjunta
							data={data}
							options={options}
							options_horizontal={options_horizontal}
							options_stacked={options_stacked}
						/>
					</>
				);
			} else if (asistenciaChecked) {
				// Datos para las variables conjuntas sexo y asistencia
				const data = [
					["Asistencia", "Masculino", "Femenino", "Otro"],
					["Han asistido", counterAsistenciaMasculino, counterAsistenciaFemenino, counterAsistenciaOtro],
					["No han asistido", counterMasculino-counterAsistenciaMasculino, counterFemenino-counterAsistenciaFemenino, counterOtro-counterAsistenciaOtro]
				];

				// Opciones para los gráficos
				const options = {
					chartArea: { width: "100%" },
				};

				// Opciones para el gráfico de barras horizontal
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					bars: "horizontal",
				};
				
				// Opciones para el gráfico de barras apiladas
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
				};
				return (
					<>
						<MostrarGraficaConjunta
							data={data}
							options={options}
							options_horizontal={options_horizontal}
							options_stacked={options_stacked}
						/>
					</>
				);
			} else if (horaLlegadaChecked) {
				// Datos para las variables conjuntas sexo y hora de llegada
				const data = [
					["Edad", "Masculino", "Femenino"],
					["18", 19, 16],
					["19", 32, 26],
					["20", 20, 15],
					["21", 21, 17],
					["22", 4, 10],
					["23", 4, 6],
					["24", 8, 14],
					["25", 11, 5],
					["32", 6, 3],
					["41", 1, 0],
					["52", 3, 2],
				];

				// Opciones para los gráficos
				const options = {
					chartArea: { width: "100%" },
				};
				// Opciones para el gráfico de barras horizontal
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					bars: "horizontal",
				};
				// Opciones para el gráfico de barras apiladas
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					}
				};
				return (
					<>
						<MostrarGraficaConjunta
							data={data}
							options={options}
							options_horizontal={options_horizontal}
							options_stacked={options_stacked}
						/>
					</>
				);
			} else {
				// Si sólo está seleccionada la variable sexo
				const data = [
					["Sexo", "Invitados"],
					["Masculino", counterMasculino],
					["Femenino", counterFemenino],
					["Otro", counterOtro]
				];

				// Opciones para los gráficos
				const options = {
					chartArea: { width: "50%" },
				};

				return (
					<MostrarGrafica
						data={data}
						options={options}
						edadChecked={edadChecked}
						horaLlegadaChecked={horaLlegadaChecked}
					></MostrarGrafica>
				);
			}
		} else if (edadChecked) {
			if (asistenciaChecked) {
				// Datos para las variables conjuntas edad y asistencia
				const data = [
					["Edad", "Han asistido", "No han asistido"],
				];

				// Se contabilizan los invitados segun edad y asistencia
				totalEdades.forEach(i =>{
					data.push([i, contabilizarElemento(i, hanAsistidoEdad), contabilizarElemento(i, noHanAsistidoEdad)])
				})
				// Opciones para los graficos
				const options = {
					chartArea: { width: "100%" },
				};
				// Opciones para el gráfico de barras horizontal
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					bars: "horizontal",
				};
				// Opciones para el gráfico de barras apiladas
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
				};
				return (
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
				);
			} else if (horaLlegadaChecked) {
				// Datos para las variables conjuntas edad y hora de llegada
				const data = [
					["Edad", "Masculino", "Femenino"],
					["18", 19, 16],
					["19", 32, 26],
					["20", 20, 15],
					["21", 21, 17],
					["22", 4, 10],
					["23", 4, 6],
					["24", 8, 14],
					["25", 11, 5],
					["32", 6, 3],
					["41", 1, 0],
					["52", 3, 2],
				];
				// Opciones para los gráficos
				const options = {
					chartArea: { width: "100%" },
				};
				// Opciones para el gráfico de barras horizontal
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					bars: "horizontal",
				};
				// Opciones para el gráfico de barras apiladas
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
				};
				return (
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
				);
			} else {
				// Si sólo se ha seleccionado la variable edad
				const data = [
					["Edad", "Invitados"],
				];
				// Contabiliza el total de edades
				totalEdades.forEach(i =>{
					data.push([i, contabilizarElemento(i, edadesMasculino)+contabilizarElemento(i, edadesFemenino)+contabilizarElemento(i, edadesOtro)]);
				})
				// Opciones para los graficos
				const options = {
					chartArea: { width: "50%" },
				};
				return (
					<MostrarGrafica
						data={data}
						options={options}
						edadChecked={edadChecked}
						horaLlegadaChecked={horaLlegadaChecked}
					></MostrarGrafica>
				);
			}
		} else if (asistenciaChecked) {
			if (horaLlegadaChecked) {
				// Datos para las variables conjuntas asistencia y hora de llegada
				const data = [
					["Edad", "Masculino", "Femenino"],
					["18", 19, 16],
					["19", 32, 26],
					["20", 20, 15],
					["21", 21, 17],
					["22", 4, 10],
					["23", 4, 6],
					["24", 8, 14],
					["25", 11, 5],
					["32", 6, 3],
					["41", 1, 0],
					["52", 3, 2],
				];
				// Opciones para los gráficos
				const options = {
					chartArea: { width: "100%" },
				};
				// Opciones para el gráfico de barras horizontal
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					bars: "horizontal",
				};
				// Opciones para el gráfico de barras apiladas
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
				};
				return (
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
				);
			} else {
				// Si sólo se ha seleccionado la variable asistencia
				const data = [
					["Asistencia", "Invitados"],
					["Han asistido", counterAsistenciaMasculino+counterAsistenciaFemenino+counterAsistenciaOtro],
					["No han asistido", invitados.length-(counterAsistenciaMasculino+counterAsistenciaFemenino+counterAsistenciaOtro)]
				];
				// Opciones para los gráficos
				const options = {
					chartArea: { width: "50%" },
				};
				return (
					<MostrarGrafica
						data={data}
						options={options}
						edadChecked={edadChecked}
						horaLlegadaChecked={horaLlegadaChecked}
					></MostrarGrafica>
				);
			}
		} else {
			// Si sólo se ha seleccionado la variable hora de llegada
			const data = [
				["Edad", "Invitados"],
				["18", 43],
				["19", 21],
				["20", 32],
				["21", 38],
				["22", 20],
				["23", 16],
				["24", 13],
				["25", 27],
				["32", 8],
				["41", 4],
				["52", 3],
			];

			const options = {
				chartArea: { width: "50%" },
			};

			return (
				<MostrarGrafica data={data} options={options}> edadChecked={edadChecked} horaLlegadaChecked={horaLlegadaChecked}</MostrarGrafica>
			);
		}
	}
};

export default Stats;
