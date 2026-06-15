import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function OrchidCard({ orchid, onDetail }) {
  return (
    <Card>
      <Card.Img variant="top" src={orchid.image} />
      <Card.Body>
        <Card.Title>{orchid.orchidName}</Card.Title>
        <Card.Text>Category: {orchid.category}</Card.Text>
        <Button variant="primary" onClick={() => onDetail(orchid)}>
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OrchidCard;
