import React from 'react'
import { Button, Modal } from "react-bootstrap"


// Este componente representa un modal genérico en nuestra aplicación.
// Se puede personalizar para cada caso de uso concreto pasandole las props necesarias
export default function ModalPlantilla({id,show, titulo, cuerpo, onHide, onEliminar}) {
  return (
    <>
        <Modal
            id={id}
            show={show}
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cuerpo}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                >
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    onClick={onEliminar}
                >
                    Eliminar
                </Button>
			</Modal.Footer>

        </Modal>
    </>
  )
}

