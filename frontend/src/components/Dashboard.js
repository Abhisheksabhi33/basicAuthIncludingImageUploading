import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { getAuthTokenFromCookie } from "../utils/utils";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([
    {
      title: "",
      description: "",
      filePath: "",
    },
  ]);
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });

  const fetchImages = async () => {
    try {
      const authToken = getAuthTokenFromCookie();
      const response = await axios.get("http://localhost:8000/user/getImages", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      console.log("Images:", response.data);
      // reverse the array so that the latest images are shown first
      response.data.reverse();
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []); // Fetch images on component mount

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage || !title || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", selectedImage);

    const authToken = getAuthTokenFromCookie();
    // console.log("Auth Token:", authToken);

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/user/upload-image",
        formData,
        {
          headers,
          withCredentials: true,
        }
      );

      console.log("Success:", response.data);

      setCreateProductResponseState({
        message: response.data.message,
        error: "",
      });

      setTitle("");
      setDescription("");
      setSelectedImage(null);

      fetchImages();
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
        alert(error.response.data.message);
      } else if (error.request) {
        console.error("Request Data:", error.request);
        alert("Network Error");
      } else {
        console.error("Error Message:", error.message);
        alert(error.message);
      }

      setCreateProductResponseState({
        message: "",
        error: error.message || "Network Error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h1>Dashboard</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose an image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Uploading...
                </>
              ) : (
                "Upload Image"
              )}
            </Button>

            {createProductResponseState.error && (
              <p className="text-danger">
                {createProductResponseState.error.toString()}
              </p>
            )}
          </Form>
          <Table responsive className="mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(images) && images.length > 0 ? (
                images.map((image) => (
                  <tr key={image._id}>
                    <td>{image.title}</td>
                    <td>{image.description}</td>
                    <td>
                      <img
                        src={`${image?.image?.url}`}
                        alt={image.title}
                        className="img-thumbnail"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No images available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
