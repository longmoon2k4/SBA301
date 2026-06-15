import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrchidCard from './OrchidCard';
import OrchidsData from '../../shared/ListOfOrchids';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function OrchidList() {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  return (
    <>
      <Row>
        {OrchidsData.map((o) => (
          <Col key={o.id} md={3} sm={6} className="mb-4">
            <OrchidCard orchid={o} onDetail={handleShow} />
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOrchid ? selectedOrchid.orchidName : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrchid ? (
            <div>
              <img src={selectedOrchid.image} alt={selectedOrchid.orchidName} style={{ width: '100%' }} />
              <p className="mt-3">{selectedOrchid.description}</p>
            </div>
          ) : (
            <p>Loading details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrchidList;
