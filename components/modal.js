import React from 'react'
import { Button, Modal } from "react-bootstrap"

export default function ModalManual({show, titulo, cuerpo, onHide, onEliminar}) {
  return (
    <>
        <Modal
            id="modalBorradoMultiple"
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

