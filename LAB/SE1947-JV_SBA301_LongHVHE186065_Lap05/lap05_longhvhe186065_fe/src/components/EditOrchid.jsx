import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

function EditOrchid() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState({});
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      orchidName: '',
      image: '',
      isNatural: false
    }
  });
  
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        const response = await axios.get(url + id);
        const data = response.data;
        setOrchid(data);
        setValue('orchidName', data.orchidName);
        setValue('image', data.image);
        setValue('isNatural', data.isNatural);
      } catch (error) {
        toast.error("Failed to load orchid details!");
        navigate('/');
      }
    };
    fetchOrchid();
  }, [id, setValue, url]);

  const onSubmit = async (updatedData) => {
    try {
      await axios.put(url + id, updatedData);
      toast.success("Orchid updated successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Orchid update failed!");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="lead text-primary">Edit the orchid: {orchid.orchidName}</p>
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
                    id="is-natural-switch-edit"
                    label="Natural"
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value || false}
                    ref={ref}
                  />
                )}
              />
            </Form.Group>

            <Button variant="secondary" onClick={() => navigate('/')} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditOrchid;
