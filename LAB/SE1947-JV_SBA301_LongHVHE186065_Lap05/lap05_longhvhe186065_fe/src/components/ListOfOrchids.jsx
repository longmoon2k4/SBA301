import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form, Image, Container } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function ListOfOrchids() {
  const [api, setApi] = useState([]);
  const [show, setShow] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      orchidName: '',
      image: '',
      isNatural: false
    }
  });

  const url = import.meta.env.VITE_API_URL;

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      setApi(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this orchid?")) {
      try {
        await axios.delete(url + id);
        toast.success("Orchid deleted successfully!");
        fetchData();
      } catch (error) {
        toast.error("Orchid deleted failed!");
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(url, data, { headers: { 'Content-Type': 'application/json' } });
      setShow(false);
      reset();
      toast.success("Orchid added successfully!");
      fetchData();
    } catch (error) {
      toast.error("Orchid added failed!");
    }
  };

  return (
    <Container>
      <Table striped bordered hover className="my-5">
        <thead>
          <tr>
            <th>Image</th>
            <th>Orchid name</th>
            <th>Original</th>
            <th>
              <Button variant="primary" onClick={handleShow}>
                Add new orchid
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {api.map((a) => (
            <tr key={a.id}>
              <td><Image src={a.image} width={40} rounded /></td>
              <td>{a.orchidName}</td>
              <td>
                {a.isNatural === true ? (
                  <span className="badge text-bg-success">Natural</span>
                ) : (
                  <span className="badge text-bg-warning">Industry</span>
                )}
              </td>
              <td>
                <Link to={'/edit/' + a.id} className="btn btn-sm btn-outline-primary me-2">
                  <i className="bi bi-pencil-square"></i> Edit
                </Link>
                <span onClick={() => handleDelete(a.id)} className="btn btn-sm btn-outline-danger" style={{ cursor: 'pointer' }}>
                  <i className="bi bi-trash3"></i> Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add new orchid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Orchid Name</Form.Label>
              <Controller
                name="orchidName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Control {...field} type="text" placeholder="Enter name" isInvalid={!!errors.orchidName} />
                )}
              />
              <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Controller
                name="image"
                control={control}
                rules={{ 
                  required: true,
                  pattern: /^https?:\/\/.+/
                }}
                render={({ field }) => (
                  <Form.Control {...field} type="text" placeholder="Enter HTTP/HTTPS URL" isInvalid={!!errors.image} />
                )}
              />
              <Form.Control.Feedback type="invalid">Valid Image URL is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Controller
                name="isNatural"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Check 
                    type="switch"
                    id="is-natural-switch"
                    label="Natural"
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value || false}
                    ref={ref}
                  />
                )}
              />
            </Form.Group>
            
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ListOfOrchids;
