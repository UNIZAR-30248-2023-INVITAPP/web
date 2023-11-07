import { Button, ListGroup, ProgressBar, Spinner } from "react-bootstrap";
import { useState } from "react";

function Ruleta({ listaInvitados }) {
    // Lista de invitados que hay en el evento. SEGURAMENTE NO SE HAGA ASÍ (!!)
    const [invitados, setInvitados] = useState(listaInvitados);
    const [candidatosVisibles, setCandidatosVisibles] = useState(false);
    const [ganadoresVisibles, setGanadoresVisibles] = useState(false);

    // Usuarios ganadores
    const [ganadores, setGanadores] = useState([]);

    // Control de los componentes que aparecen en pantalla
    const [componentesRuleta, setComponentesRuleta] = useState({
        botonDisabled: false,
        spinnerVisible: false,
    });

    // Función para seleccionar un invitado de manera aleatoria
    let invitadoRandom;
    function getInvitadoRandom() {
        return (invitadoRandom =
            invitados[Math.floor(Math.random() * invitados.length)]);
    }

    // Conseguir ganadores aleatoriamente
    const devolverGanadores = () => {
        setComponentesRuleta({
            botonDisabled: true,
            spinnerVisible: true,
        });

        // Añadimos un retardo para seleccionar el ganador y mostrar el spinner de carga
        setTimeout(() => {
            getInvitadoRandom();

            // Añadimos un ganador aleatorio a la lista de ganadores
            setGanadores([...ganadores, invitadoRandom]);

            // Actualizamos la lista de invitados extrayendo el ganador. SEGURAMENTE NO SE HAGA ASÍ (!!)
            const actualizarLista = invitados.filter(
                (ganador) => ganador !== invitadoRandom
            );

            setInvitados(actualizarLista);

            // Volvemos a habilitar el botón y ocultamos el spinner
            setComponentesRuleta({
                botonDisabled: actualizarLista.length == 0,
                spinnerVisible: false,
            });
        }, 1000);
        //getInvitadoRandom();
    };

    if (listaInvitados.length == 0) {
        return (
            <span className="fw-bold d-block mt-1 text-center">
                No hay invitados en este evento
            </span>
        );
    }

    return (
        <div className="container">
            <div className="listar-invitados d-flex flex-column gap-3 justify-content-center align-items-center">
                <span className="fs-4 text-center">
                    Número de candidatos: <b>{invitados.length}</b>
                </span>

                <Button
                    disabled={invitados.length == 0}
                    variant="secondary"
                    onClick={() => {
                        setCandidatosVisibles(!candidatosVisibles);
                    }}
                >
                    {candidatosVisibles ? "Ocultar" : "Mostrar"} candidatos
                </Button>

                {/*Sacamos por pantalla los invitados participantes del sorteo. Habrá que pensar otra manera (!!) */}
                {candidatosVisibles && (
                    <ListGroup id="userList" vertical="true">
                        {invitados.map((invitado, index) => (
                            <ListGroup.Item
                                className="lista-invitados"
                                key={index}
                            >
                                <div className="d-flex flex-column flex-md-row gap-2 justify-content-between ">
                                    <div>
                                        <span className="fw-bold d-block mt-1">
                                            Nombre:{" "}
                                            <span className="fw-light">
                                                {invitado.nombre}
                                            </span>
                                        </span>
                                        <span className="fw-bold d-block mt-1">
                                            Email:{" "}
                                            <span className="fw-light">
                                                {invitado.email}
                                            </span>
                                        </span>
                                        <span className="fw-bold d-block mt-1">
                                            DNI/NIE:{" "}
                                            <span className="fw-light">
                                                {invitado.DNI}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </div>
            <hr />

            {/*Botón para extraer los ganadores del sorteo*/}
            <div className="componentes d-flex flex-column gap-3 justify-content-center align-items-center">
                <div className="listar-ganadores d-flex flex-column gap-3 justify-content-center align-items-center">
                    <span className="fs-4 text-center">
                        Número de ganadores: <b>{ganadores.length}</b>
                    </span>

                    <Button
                        disabled={ganadores.length == 0}
                        variant="secondary"
                        onClick={() => {
                            setGanadoresVisibles(!ganadoresVisibles);
                        }}
                    >
                        {ganadoresVisibles ? "Ocultar" : "Mostrar"} ganadores
                    </Button>
                    {/*Mostramos el Spinner para simular un tiempo de carga*/}
                    {componentesRuleta.spinnerVisible && (
                        <Spinner animation="border" variant="primary" />
                    )}
                    {/*Sacamos por pantalla los ganadores del sorteo.*/}
                    {ganadoresVisibles && (
                        <ListGroup id="userList" vertical="true">
                            {ganadores.map((ganador, index) => (
                                <ListGroup.Item
                                    className="lista-ganadores"
                                    key={index}
                                    variant="warning"
                                >
                                    <div className="d-flex flex-column flex-md-row gap-2 justify-content-between ">
                                        <div>
                                            <span className="fw-bold d-block mt-1">
                                                Nombre:{" "}
                                                <span className="fw-light">
                                                    {ganador.nombre}
                                                </span>
                                            </span>
                                            <span className="fw-bold d-block mt-1">
                                                Email:{" "}
                                                <span className="fw-light">
                                                    {ganador.email}
                                                </span>
                                            </span>
                                            <span className="fw-bold d-block mt-1">
                                                DNI/NIE:{" "}
                                                <span className="fw-light">
                                                    {ganador.DNI}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>
            </div>
            <hr />
            <div className="d-grid gap-3">
                <Button
                    onClick={devolverGanadores}
                    disabled={componentesRuleta.botonDisabled}
                >
                    Generar ganador
                </Button>
                <Button variant="dark">Enviar email a los ganadores</Button>
            </div>
        </div>
    );
}

export default Ruleta;
