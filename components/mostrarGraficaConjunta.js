import { Accordion } from "react-bootstrap";
import { Chart } from "react-google-charts";

const MostrarGraficaConjunta = ({
	data,
	options,
	options_horizontal,
	options_stacked,
}) => {
	return (
		<Accordion className="mt-70">
			<Accordion.Item eventKey="0">
				<Accordion.Header>Diagrama de barras vertical</Accordion.Header>
				<Accordion.Body>
					<Chart
						chartType="Bar"
						width="100%"
						height="500px"
						data={data}
						options={options}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="1">
				<Accordion.Header>
					Diagrama de barras horizontal
				</Accordion.Header>
				<Accordion.Body>
					<Chart
						chartType="Bar"
						width="100%"
						height="500px"
						data={data}
						options={options_horizontal}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="2">
				<Accordion.Header>Diagrama de barras apiladas</Accordion.Header>
				<Accordion.Body>
					<Chart
						chartType="BarChart"
						width="100%"
						height="500px"
						data={data}
						options={options_stacked}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="3">
				<Accordion.Header>Diagrama de línea</Accordion.Header>
				<Accordion.Body>
					<Chart
						chartType="Line"
						width="100%"
						height="500px"
						data={data}
						options={options}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="4">
				<Accordion.Header>Diagrama de dispersión</Accordion.Header>
				<Accordion.Body>
					<Chart
						chartType="ScatterChart"
						width="100%"
						height="500px"
						data={data}
						options={options}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="5">
				<Accordion.Header>Diagrama en área</Accordion.Header>
				<Accordion.Body>
					<Chart
						chartType="AreaChart"
						width="100%"
						height="500px"
						data={data}
						options={options}
					/>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
		// INCLUIR DIAGRAMAS CON LA MEDIA?? (!!)
		// ...
	);
};

export default MostrarGraficaConjunta;
