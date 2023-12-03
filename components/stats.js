import { Button } from "react-bootstrap";
import { auth } from "@/firebase";
import { Chart } from "react-google-charts";
import MostrarGraficaConjunta from "./mostrarGraficaConjunta";
import MostrarGrafica from "./mostrarGrafica";

const Stats = ({ sexo, edad, asistencia, horaLlegada, counter }) => {
	// UTILIZAR PROP CONTADOR MÁS ADELANTA (!!)
	if (!sexo && !edad && !asistencia && !horaLlegada) {
		return <p>Debes seleccionar dos variables</p>;
	} else if (counter > 1) {
		return <p>Debes seleccionar solo dos variables</p>;
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
					title: "Invitados del evento por sexo y edad",
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					title: "Invitados del evento por sexo y edad",
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
					title: "Invitados del evento por sexo y edad",
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
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
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
					title: "Invitados del evento por sexo y edad",
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					title: "Invitados del evento por sexo y edad",
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
					title: "Invitados del evento por sexo y edad",
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
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
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
					title: "Invitados del evento por sexo y edad",
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					title: "Invitados del evento por sexo y edad",
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
					title: "Invitados del evento por sexo y edad",
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
					<MostrarGraficaConjunta
						data={data}
						options={options}
						options_horizontal={options_horizontal}
						options_stacked={options_stacked}
					/>
				);
			} else {
				// Si sólo está seleccionada la variable sexo
				const data = [
					["Sexo", "Invitados"],
					["Masculino", 55],
					["Femenino", 45],
				];

				const options = {
					title: "Invitados del evento por sexo",
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
					title: "Invitados del evento por edad y asistencia",
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					title: "Invitados del evento por edad y asistencia",
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
					title: "Invitados del evento por edad y asistencia",
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
					title: "Invitados del evento por edad y hora de llegada",
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					title: "Invitados del evento por edad y hora de llegada",
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
					title: "Invitados del evento por edad y hora de llegada",
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
					title: "Invitados del evento por edad",
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
					title: "Invitados del evento por asistencia y hora de llegada",
					chartArea: { width: "100%" },
				};
				{
					/*Opciones para el gráfico de barras horizontal*/
				}
				const options_horizontal = {
					title: "Invitados del evento por asistencia y hora de llegada",
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
					title: "Invitados del evento por asistencia y hora de llegada",
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
					title: "Invitados del evento por asistencia",
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
				title: "Invitados del evento por asistencia",
				chartArea: { width: "50%" },
			};

			return (
				<MostrarGrafica data={data} options={options}></MostrarGrafica>
			);
		}
	}
};

export default Stats;