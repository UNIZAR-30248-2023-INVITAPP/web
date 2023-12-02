import { Button, ListGroup, ProgressBar, Spinner } from "react-bootstrap";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

function Ruleta({ listaInvitados, nombreEvento }) {
    // Lista de invitados que hay en el evento. SEGURAMENTE NO SE HAGA ASÍ (!!)
    const [invitados, setInvitados] = useState(listaInvitados);
    const [candidatosVisibles, setCandidatosVisibles] = useState(false);
    const [ganadoresVisibles, setGanadoresVisibles] = useState(false);
    const [premios, setPremios] = useState(new Set());
    
    const [mensajeCorreoEnviado, setMensajeCorreoEnviado] = useState("")

    const [spinnerCorreo, setSpinnerCorreo] = useState(false)

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

    // Boton para enviar correo al ganador del correo
    const handleClickBotonCorreo = async () => {
        try {
            setSpinnerCorreo(true)
            const dataToSend = ganadores.map(ganador => ({
                premio: ganador.premio, // Valor del premio
                nombreEvento: nombreEvento, // Nombre del evento
                email: ganador.email // Email del ganador
            }));
            console.log(dataToSend)
            const response = await fetch('/api/sendMail', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (response.ok) {
                setMensajeCorreoEnviado(`El correo se ha enviado correctamente ${ganadores.length === 1 ? 'al ganador' : 'a los ganadores'} del sorteo`)
                // Mostrar el mensaje durante 3 segundos
                setTimeout(() => {
                    setMensajeCorreoEnviado('');
                }, 3000);
            } else {
                console.error('Error al enviar el correo');
                // Aquí podrías manejar el error al enviar el correo
            }
        } catch (error) {
            console.error('Error:', error);
            // Manejo de errores en caso de problemas con la solicitud
        }
        finally {
            setSpinnerCorreo(false)
        }
        
    };

    // Conseguir ganadores aleatoriamente
    const devolverGanadores = (event) => {
        event.preventDefault();
        setComponentesRuleta({
            botonDisabled: true,
            spinnerVisible: true,
        });

        // Añadimos un retardo para seleccionar el ganador y mostrar el spinner de carga
        setTimeout(() => {
            const premio = event.target.formPremio.value;
            setPremios(premios.add(premio));
            getInvitadoRandom();
            console.log(premios);

            // Añadimos un ganador aleatorio a la lista de ganadores
            setGanadores([...ganadores, { ...invitadoRandom, premio: premio }]);
            console.log(ganadores);

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
                        <>
                            {Array.from(premios).map((premio) => {
                                return (
                                    <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                                        <span className="fs-5">{premio}</span>
                                        <ListGroup
                                            id="userList"
                                            vertical="true"
                                        >
                                            {ganadores
                                                .filter(
                                                    (g) => g.premio == premio
                                                )
                                                .map((ganador, index) => (
                                                    <ListGroup.Item
                                                        className="lista-ganadores"
                                                        key={index}
                                                        variant="success"
                                                    >
                                                        <div className="d-flex flex-column flex-md-row gap-2 justify-content-between ">
                                                            <div>
                                                                <span className="fw-bold d-block mt-1">
                                                                    Nombre:{" "}
                                                                    <span className="fw-light">
                                                                        {
                                                                            ganador.nombre
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <span className="fw-bold d-block mt-1">
                                                                    Email:{" "}
                                                                    <span className="fw-light">
                                                                        {
                                                                            ganador.email
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <span className="fw-bold d-block mt-1">
                                                                    DNI/NIE:{" "}
                                                                    <span className="fw-light">
                                                                        {
                                                                            ganador.DNI
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            
                                                        </div>
                                                    </ListGroup.Item>
                                                ))}
                                        </ListGroup>
                                    </div>
                                );
                            })}
                            {mensajeCorreoEnviado && (
                                <>
                                    <p className="text-success">{mensajeCorreoEnviado}</p>
                                </>
                            )}
                            {spinnerCorreo && (
                                        <Spinner animation="border" variant="primary" />
                            )}
                            {!spinnerCorreo && !mensajeCorreoEnviado && (
                                <Button
                                className="btn btn-dark"
                                onClick={handleClickBotonCorreo}
                                >
                                    {`Enviar correo ${ganadores.length === 1 ? 'al ganador' : 'a los ganadores'}`}
                                </Button>
                            )}
                            
                        </>
                    )}
                </div>
            </div>
            <hr />
            <div className="d-grid gap-3">
                <Form onSubmit={devolverGanadores}>
                    <Form.Group className="mb-3" controlId="formPremio">
                        <Form.Label>Premio</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduzca premio"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre no puede estar vacio
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button
                            type="submit"
                            disabled={componentesRuleta.botonDisabled}
                        >
                            Generar ganador
                        </Button>
                    </div>
                </Form>
                {/* <Button variant="dark">Enviar email a los ganadores</Button> */}
            </div>
        </div>
    );
}

export default Ruleta;
