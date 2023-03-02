import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";

function ConfirmationModal(props) {
  const [showModal, setShowModal] = useState(true);

  function handleClose() {
    setShowModal(false);
  }

  function handleConfirm() {
    setShowModal(false);
    //props.onConfirm(props.id);
  }

  return (
    <div
      className="modal show"
      style={{ display: showModal ? "block" : "none", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Eliminiar {props.item}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Desea Eliminar el curso {props.nombre}?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm()}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
export default ConfirmationModal;
