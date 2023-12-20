import MostrarGraficaConjunta from "./mostrarGraficaConjunta";
import MostrarGrafica from "./mostrarGrafica";

const Stats = ({ generoChecked, edadChecked, asistenciaChecked, horaLlegadaChecked, counter, invitados }) => {

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

	// Funcion para redondear horas de llegada
	function redondearHora(minutos){
		if(minutos>=0 && minutos<=7){
			return "00";
		}
		else if(minutos>=8 && minutos<=22){
			return "15";
		}
		else if(minutos>=23 && minutos<=37){
			return "30";
		}
		else if(minutos>=52 && minutos<=59){
			return "nueva_hora"
		}
		else {
			return "45";
		}
	}

	// función que compara dos horas
	function comparar(hora1, hora2){
		var partes1 = [];
		var partes2 = [];
		partes1 = hora1.split(":");
		partes2 = hora2.split(":");
		if(partes2[0]>partes1[0]){
			return -1;
		}
		else if(partes2[0]<partes1[0]){
			return 1;
		}
		else if(partes1[0]==partes2[0]){
			if(partes2[1]>partes1[1]){
				return -1;
			}
			else if(partes2[1]<partes1[1]){
				return 1;
			}
			else{
				return 0;
			}
		}
	}
	
	// Arrays de edades segun genero
	const edadesMasculino = []
	const edadesFemenino = []
	const edadesOtro = []

	// Arrays de asistencias segun edad
	const hanAsistidoEdad = []

	// Arrays de horas segun genero
	const horaLlegadaMasculino = []
	const horaLlegadaFemenino = []
	const horaLlegadaOtro = []

	// Variables de contadores de genero
	var counterMasculino = 0;
	var counterFemenino = 0;
	var counterOtro = 0;

	// Variables de contadores de asistencia según genero
	var counterAsistenciaMasculino = 0;
	var counterAsistenciaFemenino = 0;
	var counterAsistenciaOtro = 0;

	// Array que contiene las diferentes edades de los invitados
	const totalEdades = []

	// Array que contiene las diferentes horas de llegada
	const totalHoras = []

	var noHayDatosHoraLlegada = false;
	var noHayDatosEdad = false;

	// Recorro el conjunto de invitados
	invitados.forEach(i => {

		// Creamos una variable para ver si la edad del invitado está incluida en el vector totalEdades
		var edadEncontrada = false;

		// Creamos una variable para ver si la hora de llegada del invitado está incluida en el vector totalHoras
		var horaLlegadaEncontrada = false;

		// ACABARÁ SIENDO -> var cambioTimestampEdad = new Date(i.edad);
		// ACABARÁ SIENDO -> var edad = calcularEdad(cambioTimestampEdad);

		// Verificamos si el invitado ha asistido
		// en caso afirmativo, transformamos su timestamp a fecha
		if(i.asistencia){
			var cambioTimestampHoraLlegada = new Date(i.horaLlegada);
			totalHoras.forEach(j => {
				var minutos = redondearHora(cambioTimestampHoraLlegada.getMinutes());
				if(minutos=="nueva_hora"){
					console.log("soy " + i.nombre + ": antes -> " + cambioTimestampHoraLlegada.getHours() + ":" + cambioTimestampHoraLlegada.getMinutes());
					cambioTimestampHoraLlegada.setHours(cambioTimestampHoraLlegada.getHours()+1, "00", cambioTimestampHoraLlegada.getSeconds(), cambioTimestampHoraLlegada.getMilliseconds());
					console.log("soy " + i.nombre + ": despues -> " + cambioTimestampHoraLlegada.getHours() + ":" + cambioTimestampHoraLlegada.getMinutes());
					minutos="00";
				}
				if(j==cambioTimestampHoraLlegada.getHours()+":"+minutos){
					horaLlegadaEncontrada = true;
				}
			})

			// Si la edad del invitado ya está incluida cambiamos la variable a true
			totalEdades.forEach(j => {
				if(j==i.edad){ // ACABARÁ SIENDO -> edad
					edadEncontrada = true;
				}
			})
		}
		
		// Si la hora de llegada no está incluida, la añadimos al vector totalHoras
		if(i.asistencia && !horaLlegadaEncontrada){
			var minutos = redondearHora(cambioTimestampHoraLlegada.getMinutes());
			if(minutos=="nueva_hora"){
				cambioTimestampHoraLlegada.setHours(cambioTimestampHoraLlegada.getHours()+1, cambioTimestampHoraLlegada.getMinutes(), cambioTimestampHoraLlegada.getSeconds(), cambioTimestampHoraLlegada.getMilliseconds());
				minutos="00";
			}
			//ordenar(totalHoras, cambioTimestampHoraLlegada.getHours(), minutos);
			totalHoras.push(cambioTimestampHoraLlegada.getHours() + ":" + minutos);
		}

		// Si la edad del invitado no está incluida, la añadimos al vector totalEdades
		if(i.asistencia && !edadEncontrada){
			totalEdades.push(i.edad); // ACABARÁ SIENDO -> edad
		}

		// Si el invitado es de genero masculino
		if(i.genero == "Masculino"){
			// Se aumenta el contador de invitados masculino
			counterMasculino++;
			// Si ha asistido se incrementa el contador de asistencia masculino
			// y se añade al vector hanAsistidoEdad
			if(i.asistencia){
				// Añade su edad al vector edadesMasculino
				edadesMasculino.push(i.edad); // ACABARÁ SIENDO -> edad
				counterAsistenciaMasculino++;
				hanAsistidoEdad.push(i.edad); // ACABARÁ SIENDO -> edad
				var minutos = redondearHora(cambioTimestampHoraLlegada.getMinutes());
				if(minutos=="nueva_hora"){
					cambioTimestampHoraLlegada.setHours(cambioTimestampHoraLlegada.getHours()+1, cambioTimestampHoraLlegada.getMinutes(), cambioTimestampHoraLlegada.getSeconds(), cambioTimestampHoraLlegada.getMilliseconds());
					minutos="00";
				}
				horaLlegadaMasculino.push(cambioTimestampHoraLlegada.getHours() + ":" + minutos);
			}
		}
		// Si el invitado es de genero femenino
		else if(i.genero == "Femenino"){
			// Se aumenta el contador de invitados femenino
			counterFemenino++;
			// Si ha asistido se incrementa el contador de asistencia femenino
			// y se añade al vector hanAsistidoEdad
			if(i.asistencia){
				// Añade su edad al vector edadesFemenino
				edadesFemenino.push(i.edad); // ACABARÁ SIENDO -> edad
				counterAsistenciaFemenino++;
				hanAsistidoEdad.push(i.edad); // ACABARÁ SIENDO -> edad
				var minutos = redondearHora(cambioTimestampHoraLlegada.getMinutes());
				var minutos = redondearHora(cambioTimestampHoraLlegada.getMinutes());
				if(minutos=="nueva_hora"){
					cambioTimestampHoraLlegada.setHours(cambioTimestampHoraLlegada.getHours()+1, cambioTimestampHoraLlegada.getMinutes(), cambioTimestampHoraLlegada.getSeconds(), cambioTimestampHoraLlegada.getMilliseconds());
					minutos="00";
				}
				horaLlegadaFemenino.push(cambioTimestampHoraLlegada.getHours() + ":" + minutos);
			}
		}
		else{
			// Se aumenta el contador de invitados otro
			counterOtro++;
			// Si ha asistido se incrementa el contador de asistencia otro
			// y se añade al vector hanAsistidoEdad
			if(i.asistencia){
				// Añade su edad al vector edadesOtro
				edadesOtro.push(i.edad); // ACABARÁ SIENDO -> edad
				counterAsistenciaOtro++;
				hanAsistidoEdad.push(i.edad); // ACABARÁ SIENDO -> edad
				var minutos = redondearHora(cambioTimestampHoraLlegada.getMinutes());
				if(minutos=="nueva_hora"){
					cambioTimestampHoraLlegada.setHours(cambioTimestampHoraLlegada.getHours()+1, cambioTimestampHoraLlegada.getMinutes(), cambioTimestampHoraLlegada.getSeconds(), cambioTimestampHoraLlegada.getMilliseconds());
					minutos="00";
				}
				horaLlegadaOtro.push(cambioTimestampHoraLlegada.getHours() + ":" + minutos);
			}
		}
	})

	console.log(totalHoras.length);

	if(totalHoras.length==0){
		noHayDatosHoraLlegada = true;
	}

	if(totalEdades.length==0){
		noHayDatosEdad = true;
	}
	
	totalHoras.sort(comparar);
	console.log(totalHoras);
	console.log(horaLlegadaMasculino);
	console.log(horaLlegadaFemenino);
	console.log(horaLlegadaOtro);

	// Si no ha seleccionado ninguna de las variables
	if (counter==0) {
		return (
			<div className="d-flex justify-content-center py-4">
				<h3 className="mt-8">
					Selecciona al menos una de las variables
				</h3>
			</div>
		);
	} 
	// Si han seleccionado más de dos variables
	else if (counter > 2) {
		return (
			<div className="d-flex justify-content-center py-4">
				<h3 className="mt-8">Debes seleccionar solo dos variables</h3>
			</div>
		);
	} 
	// Si se ha seleccionado una o dos variables
	else {
		if (generoChecked) {
			if (edadChecked) {
				// Datos para las variables conjuntas genero y edad
				const data = [
					["Edad", "Masculino", "Femenino", "Otro"],
				];

				// Se contabilizan los invitados segun genero y edad
				totalEdades.forEach(i =>{
					data.push([i, contabilizarElemento(i, edadesMasculino), contabilizarElemento(i, edadesFemenino), contabilizarElemento(i, edadesOtro)]);
				})
					
				// Opciones para los gráficos
				const options = {
					chartArea: { width: "80em" },
				};
				
				//Opciones para el gráfico de barras horizontal
				const options_horizontal = {
					chartArea: { width: "80em" },
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
							edadChecked={edadChecked}
							horaLlegadaChecked={horaLlegadaChecked}
							noHayDatosEdad={noHayDatosEdad}
							noHayDatosHoraLlegada={noHayDatosHoraLlegada}
						/>
					</>
				);
			} else if (asistenciaChecked) {
				// Datos para las variables conjuntas genero y asistencia
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
							edadChecked={edadChecked}
							horaLlegadaChecked={horaLlegadaChecked}
							noHayDatosEdad={noHayDatosEdad}
							noHayDatosHoraLlegada={noHayDatosHoraLlegada}
						/>
					</>
				);
			} else if (horaLlegadaChecked) {
				// Datos para las variables conjuntas genero y hora de llegada
				const data = [
					["Hora de llegada", "Masculino", "Femenino", "Otro"],
				];

				totalHoras.forEach(i => {
					data.push([i, contabilizarElemento(i, horaLlegadaMasculino), contabilizarElemento(i, horaLlegadaFemenino), contabilizarElemento(i, horaLlegadaOtro)]);
				})

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
							edadChecked={edadChecked}
							horaLlegadaChecked={horaLlegadaChecked}
							noHayDatosEdad={noHayDatosEdad}
							noHayDatosHoraLlegada={noHayDatosHoraLlegada}
						/>
					</>
				);
			} else {
				// Si sólo está seleccionada la variable genero
				const data = [
					["Genero", "Invitados"],
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
						noHayDatosEdad={noHayDatosEdad} 
						noHayDatosHoraLlegada={noHayDatosHoraLlegada}
					></MostrarGrafica>
				);
			}
		} else if (edadChecked) {
			if (asistenciaChecked) {
				// Datos para las variables conjuntas edad y asistencia
				const data = [
					["Edad", "Han asistido"],
				];

				// Se contabilizan los invitados segun edad y asistencia
				totalEdades.forEach(i =>{
					data.push([i, contabilizarElemento(i, hanAsistidoEdad)])
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
						edadChecked={edadChecked}
						horaLlegadaChecked={horaLlegadaChecked}
						noHayDatosEdad={noHayDatosEdad}
						noHayDatosHoraLlegada={noHayDatosHoraLlegada}
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
						noHayDatosEdad={noHayDatosEdad} 
						noHayDatosHoraLlegada={noHayDatosHoraLlegada}
					></MostrarGrafica>
				);
			}
		} else if (asistenciaChecked) {
			if (horaLlegadaChecked) {
				// Si sólo se ha seleccionado la variable hora de llegada
			const data = [
				["Hora de llegada", "Invitados"],
			];

			totalHoras.forEach(i =>{
				data.push([i, contabilizarElemento(i, horaLlegadaMasculino)+contabilizarElemento(i, horaLlegadaFemenino)+contabilizarElemento(i, horaLlegadaOtro)]);
			})

			const options = {
				chartArea: { width: "50%" },
			};

			return (
				<MostrarGrafica 
					data={data} 
					options={options} 
					edadChecked={edadChecked} 
					horaLlegadaChecked={horaLlegadaChecked}
					noHayDatosEdad={noHayDatosEdad} 
					noHayDatosHoraLlegada={noHayDatosHoraLlegada}>
				</MostrarGrafica>
			);
			} 
			else {
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
						noHayDatosEdad={noHayDatosEdad} 
						noHayDatosHoraLlegada={noHayDatosHoraLlegada}
					></MostrarGrafica>
				);
			}
		} else {
			// Si sólo se ha seleccionado la variable hora de llegada
			const data = [
				["Hora de llegada", "Invitados"],
			];

			totalHoras.forEach(i =>{
				data.push([i, contabilizarElemento(i, horaLlegadaMasculino)+contabilizarElemento(i, horaLlegadaFemenino)+contabilizarElemento(i, horaLlegadaOtro)]);
			})

			const options = {
				chartArea: { width: "50%" },
			};

			return (
				<MostrarGrafica 
					data={data} 
					options={options} 
					edadChecked={edadChecked} 
					horaLlegadaChecked={horaLlegadaChecked} 
					noHayDatosEdad={noHayDatosEdad} 
					noHayDatosHoraLlegada={noHayDatosHoraLlegada}>
				</MostrarGrafica>
			);
		}
	}
};

export default Stats;
