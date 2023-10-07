import React, { useState } from 'react';
import Layout from '@/components/layout';
import Evento from '../components/evento'
import { Modal } from 'react-bootstrap';


function EventosPage() {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const eventos = [
        {
          imagen: 'imagen1.jpg',
          nombre: 'Evento 1',
          fecha: 'Fecha 1',
          hora: 'Hora 1',
          ubicacion: 'Ubicación 1',
        },
        {
          imagen: 'imagen2.jpg',
          nombre: 'Evento 2',
          fecha: 'Fecha 2',
          hora: 'Hora 2',
          ubicacion: 'Ubicación 2',
        },
        // Agrega más eventos si es necesario
      ];

    return (
        <div>
            <Layout>
                {/* Contenido de la página */}
                <div className="container mt-4">
                    <div className="mx-5">
                        <div className='d-flex justify-content-between'>
                            <h1>Mis Eventos</h1>
                            <button className="btn btn-dark m-2" onClick={handleShow}>Crear Evento</button>
                        </div>

                        {/* Modal de crear evento */}
                        <Modal show={showModal} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Crear un nuevo evento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Contenido del Modal
                            </Modal.Body>
                        </Modal>
                        {/* Modal de crear evento */}

                            
                        <div className="p-5 rounded bg-light">
                        {/* Carrusel de eventos */}
                            <ul className="list-group">
                            {eventos.map((evento, index) => (
                                <Evento key={index} {...evento} />
                            ))}
                            </ul>

                        </div>
                    </div>
                    
                </div>
            </Layout>
        </div>
    );
}

export default EventosPage;
