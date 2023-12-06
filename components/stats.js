import MostrarGraficaConjunta from "./mostrarGraficaConjunta";
import MostrarGrafica from "./mostrarGrafica";

//const datosEjemplo = [["Pepe Lopez", "M", "22", "Si", "0:30"], ["Jose Martinez", "M", "19", "No", ""],["Maria Sanchez", "F", "24", "Si", "1:30"], ["Ana Ortiz", "F", "21", "No", ""]]

const Stats = ({ sexo, edad, asistencia, horaLlegada, counter }) => {
	if (counter==0) {
		return (
			<div class="d-flex justify-content-center py-4">
				<h2 className="mt-8">
					Selecciona al menos una de las variables
				</h2>
			</div>
		);
	} else if (counter > 2) {
		return (
			<div class="d-flex justify-content-center py-4">
				<h2 className="mt-8">Debes seleccionar solo dos variables</h2>
			</div>
		);
	} else {
		if (sexo) {
			if (edad) {
				{
					/*Datos para las variables conjuntas sexo y edad*/
				}
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
				{
					/*Opciones para los gráficos*/
				}
				const options = {
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					vAxis: {
						title: "Invitados",
					},
					bars: "horizontal",
				};
				{
					/*Opciones para el gráfico de barras apiladas*/
				}
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
					vAxis: {
						title: "Edad",
					},
				};
				// Gráficos para las variables conjuntas sexo y edad
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
			} else if (asistencia) {
				{
					/*Datos para las variables conjuntas sexo y asistencia*/
				}
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
				{
					/*Opciones para los gráficos*/
				}
				const options = {
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					vAxis: {
						title: "Invitados",
					},
					bars: "horizontal",
				};
				{
					/*Opciones para el gráfico de barras apiladas*/
				}
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
					vAxis: {
						title: "Edad",
					},
				};
				// Gráficos para las variables conjuntas sexo y asistencia
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
			} else if (horaLlegada) {
				{
					/*Datos para las variables conjuntas sexo y hora de llegada*/
				}
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
				{
					/*Opciones para los gráficos*/
				}
				const options = {
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					vAxis: {
						title: "Invitados",
					},
					bars: "horizontal",
				};
				{
					/*Opciones para el gráfico de barras apiladas*/
				}
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
					vAxis: {
						title: "Edad",
					},
				};
				// Gráficos para las variables conjuntas sexo y asistencia
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
					["Masculino", 55],
					["Femenino", 45],
				];

				const options = {
					chartArea: { width: "50%" },
				};

				return (
					<MostrarGrafica
						data={data}
						options={options}
					></MostrarGrafica>
				);
			}
		} else if (edad) {
			if (asistencia) {
				{
					/*Datos para las variables conjuntas edad y asistencia*/
				}
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
				{
					/*Opciones para los gráficos*/
				}
				const options = {
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					vAxis: {
						title: "Invitados",
					},
					bars: "horizontal",
				};
				{
					/*Opciones para el gráfico de barras apiladas*/
				}
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
					vAxis: {
						title: "Edad",
					},
				};
				// Gráficos para las variables conjuntas edad y asistencia
				return (
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
				);
			} else if (horaLlegada) {
				{
					/*Datos para las variables conjuntas edad y hora de llegada*/
				}
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
				{
					/*Opciones para los gráficos*/
				}
				const options = {
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					vAxis: {
						title: "Invitados",
					},
					bars: "horizontal",
				};
				{
					/*Opciones para el gráfico de barras apiladas*/
				}
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
					vAxis: {
						title: "Edad",
					},
				};
				// Gráficos para las variables conjuntas edad y hora de llegada
				return (
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
				);
			} else {
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
					<MostrarGrafica
						data={data}
						options={options}
					></MostrarGrafica>
				);
			}
		} else if (asistencia) {
			if (horaLlegada) {
				{
					/*Datos para las variables conjuntas asistencia y hora de llegada*/
				}
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
				{
					/*Opciones para los gráficos*/
				}
				const options = {
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					chartArea: { width: "100%" },
					hAxis: {
						title: "Edad",
						minValue: 0,
					},
					vAxis: {
						title: "Invitados",
					},
					bars: "horizontal",
				};
				{
					/*Opciones para el gráfico de barras apiladas*/
				}
				const options_stacked = {
					chartArea: { width: "100%" },
					isStacked: true,
					hAxis: {
						title: "Total invitados",
						minValue: 0,
					},
					vAxis: {
						title: "Edad",
					},
				};
				// Gráficos para las variables conjuntas asistencia y hora de llegada
				return (
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
				);
			} else {
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
					<MostrarGrafica
						data={data}
						options={options}
					></MostrarGrafica>
				);
			}
		} else {
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
				<MostrarGrafica data={data} options={options}></MostrarGrafica>
			);
		}
	}
};

export default Stats;
