// Evento.js

import React from 'react';

function Evento({nombre, fecha, hora, ubicacion }) {
  return (
    <li className="mb-4 list-group-item border border-2 rounded col-8 mx-auto">
      {/* Card para el evento */}
      <div className="mx-auto">
        <h5 className="fw-bold">{nombre}</h5>
        <span className="fw-bold d-block mt-1">Fecha: <span className='fw-light'>{fecha}</span></span>
        <span className="fw-bold d-block mt-1">Hora: <span className='fw-light'>{hora}</span></span>
        <span className="fw-bold d-block mt-1">Ubicación: <span className='fw-light'>{ubicacion}</span></span>
      </div>
    </li>
    
  );
}

export default Evento;
