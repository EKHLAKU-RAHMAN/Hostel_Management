import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files.length) return alert("Select images to upload");

    const formData = new FormData();
    for (let f of files) {
      formData.append("images", f);
    }

    setLoading(true);
    try {
      await fetch(`${API_URL}/api/gallery/upload`, {
        method: "POST",
        body: formData,
      });
      setFiles([]);
      fetchImages();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await fetch(`${API_URL}/api/gallery/${id}`, { method: "DELETE" });
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <Container className="mt-4">
        <Card className="p-3 shadow-sm mb-4">
          <h5>Upload Images to Gallery</h5>
          <Form onSubmit={handleUpload}>
            <Form.Group className="mb-2">
              <Form.Label>Select Images</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
              />
            </Form.Group>
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Form>
        </Card>

        <Row>
          {images.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            images.map((img) => (
              <Col md={3} key={img._id} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL}/uploads/gallery/${img.filename}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(img._id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </AdminLayout>
  );
}
