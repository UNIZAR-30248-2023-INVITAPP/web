import React from "react";



const BodyModal = ({ 
    nombreEvento, 
    onChangeNombre, 
    fechaEvento, 
    onChangeFecha, 
    horaEvento, 
    onChangeHora,
    ubicacionEvento,
    onChangeUbicacion,
    error,
    onClickEvento,
    errorFecha,
    buttonName //Nombre del boton en el body del modal
    }) => {
    return ( 
        <>
            <form>
                <div className="mb-3">
                    <label
                        htmlFor="nombre"
                        className="form-label fw-bold"
                    >
                        Nombre del evento
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombreEvento}
                        placeholder="Ingrese el nombre del evento"
                        onChange={onChangeNombre}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="fecha"
                        className="form-label fw-bold"
                    >
                        Fecha
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha"
                        value={fechaEvento}
                        onChange={onChangeFecha}
                    />
                    {errorFecha && (
                        <p className="text-center text-danger">
                            {errorFecha}
                        </p>
                    )}{" "}
                    {/* Mostrar mensaje de error */}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="hora"
                        className="form-label fw-bold"
                    >
                        Hora
                    </label>
                    <input
                        type="time"
                        className="form-control"
                        id="hora"
                        value={horaEvento}
                        onChange={onChangeHora}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="ubicacion"
                        className="form-label fw-bold"
                    >
                        Ubicación
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="ubicacion"
                        placeholder="Ingrese la ubicación del evento"
                        value={ubicacionEvento}
                        onChange={onChangeUbicacion}
                    />
                </div>
                <div className="text-center">
                    {error && (
                        <p className="text-danger">
                            {error}
                        </p>
                    )}{" "}
                    {/* Mostrar mensaje de error */}
                    <button
                        id="boton-crear-evento"
                        className="btn btn-dark w-100"
                        onClick={onClickEvento}
                    >
                        {buttonName}
                    </button>
                </div>
            </form>
        </> 
    
    );
}
 
export default BodyModal;