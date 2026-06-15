import React from 'react'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import OrchidsData from '../../shared/ListOfOrchids'

export default function Orchids() {
  return (
    <Container>
      <Row>
        {OrchidsData.map((o) => (
          <Col md={3} key={o.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`/${o.image}`} alt={o.orchidName} />
              <Card.Body>
                <Card.Title>{o.orchidName}</Card.Title>
                <Card.Text>{o.description}</Card.Text>
                <Button variant="primary">Detail of Orchid</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
