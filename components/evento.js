// Evento.js

import React from 'react';


function Evento({nombre, fecha, hora, ubicacion, onEliminar }) {
  return (
    <li className="mb-4 list-group-item border border-2 rounded col-8 mx-auto">
        <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold">{nombre}</h5>
              <span className="fw-bold d-block mt-1">Fecha: <span className='fw-light'>{fecha}</span></span>
              <span className="fw-bold d-block mt-1">Hora: <span className='fw-light'>{hora}</span></span>
              <span className="fw-bold d-block mt-1">Ubicación: <span className='fw-light'>{ubicacion}</span></span>
            </div>
            
            {/* Botón de eliminación a la derecha */}
            <button
              className="btn btn-danger" // Estilo de botón de eliminación
              onClick={onEliminar} // Manejador para eliminar el evento por índice
            > Borrar
            </button>
          </div>
    </li>
    
  );
}

export default Evento;
