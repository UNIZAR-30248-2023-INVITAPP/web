import { useState, useEffect } from "react";
import { Accordion, ButtonGroup, Spinner, ToggleButton } from "react-bootstrap";
import { Chart } from "react-google-charts";

const MostrarGraficaConjunta = ({
	data,
	options,
	options_horizontal,
	options_stacked,
}) => {
	const [isLoading, setLoading] = useState(false);

	// Variables para controlar los botones que han sido pulsados
	const [verticalChecked, setVerticalChecked] = useState(true);
	const [horizontalChecked, setHorizontalChecked] = useState(false);
	const [apiladasChecked, setApiladasChecked] = useState(false);

	// Variable contador para gestionar las estadísticas
	const [algoSeleccionado, setAlgoSeleccionado] = useState(true);

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
	const handleClickOnVertical = () => {
		if (!verticalChecked) {
			//setLoading(true);
			setHorizontalChecked(false);
			setApiladasChecked(false);
			setVerticalChecked(!verticalChecked);
			setAlgoSeleccionado(true);
		} else {
			setVerticalChecked(!verticalChecked);
			setAlgoSeleccionado(false);
		}
	};

	const handleClickOnHorizontal = () => {
		if (!horizontalChecked) {
			//setLoading(true);
			setHorizontalChecked(!horizontalChecked);
			setVerticalChecked(false);
			setApiladasChecked(false);
			setAlgoSeleccionado(true);
		} else {
			setHorizontalChecked(!horizontalChecked);
			setAlgoSeleccionado(false);
		}
	};

	const handleClickOnApiladas = () => {
		if (!apiladasChecked) {
			//setLoading(true);
			setApiladasChecked(!apiladasChecked);
			setHorizontalChecked(false);
			setVerticalChecked(false);
			setAlgoSeleccionado(true);
		} else {
			setApiladasChecked(!apiladasChecked);
			setAlgoSeleccionado(false);
		}
	};

	return (
		<>
		<hr/>
		<h2>Diagrama de barras</h2>
		<div className="d-flex justify-content-center">
			<ButtonGroup horizontal size="lg">
				<ToggleButton
					id="toggle-check"
					type="checkbox"
					variant="outline-primary"
					checked={verticalChecked ? true : false}
					disabled={isLoading}
					onClick={!isLoading ? handleClickOnVertical : null}
				>
					Vertical
				</ToggleButton>
				<ToggleButton
					id="toggle-check"
					type="checkbox"
					variant="outline-primary"
					checked={horizontalChecked ? true : false}
					disabled={isLoading}
					onClick={!isLoading ? handleClickOnHorizontal : null}
				>
					Horizontal
				</ToggleButton>
				<ToggleButton
					id="toggle-check"
					type="checkbox"
					variant="outline-primary"
					checked={apiladasChecked ? true : false}
					disabled={isLoading}
					onClick={!isLoading ? handleClickOnApiladas : null}
				>
					Apiladas
				</ToggleButton>
			</ButtonGroup>
		</div>
		{isLoading ? <div className="d-flex justify-content-center py-3">
									<Spinner></Spinner>
								</div> : algoSeleccionado ?
								<div className="d-flex justify-content-center py-1">
									<Chart
									chartType= {apiladasChecked ? "BarChart" : "Bar"}
									width="80em"
									height="300px"
									data={data}
									options={verticalChecked ? options : horizontalChecked ? options_horizontal : apiladasChecked ? options_stacked : null}
									/>
								</div>
								:
								<div className="d-flex justify-content-center py-2">
									<h3>Debes seleccionar una de las variables</h3>
								</div>

		}
		</>
	);
};

export default MostrarGraficaConjunta;
