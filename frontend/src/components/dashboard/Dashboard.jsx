import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Form, Pagination, Modal, Card } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './Dashboard.css'; // Import the new CSS file

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  // Fetch product, user, and orders counts
  useEffect(() => {
    // Fetch products, item count, user count, and orders count from API
    axios
      .all([
        axios.get('https://restaurantwebsite-mernstack-1.onrender.com/api/products/getAllProducts'),
        axios.get('https://restaurantwebsite-mernstack-1.onrender.com/api/products/count'),
        axios.get('https://restaurantwebsite-mernstack-1.onrender.com/api/users/count'),
        axios.get('https://restaurantwebsite-mernstack-1.onrender.com/api/orders/count')
      ])
      .then(
        axios.spread((productsResponse, itemCountResponse, userCountResponse, ordersCountResponse) => {
          setProducts(productsResponse.data);
          setItemCount(itemCountResponse.data.count);
          setUserCount(userCountResponse.data.count);
          setOrdersCount(ordersCountResponse.data.count);
          setLoading(false);
        })
      )
      .catch((error) => {
        setError('Failed to load data.');
        setLoading(false);
      });
  }, []);

  // Handle Delete Product
  const handleDelete = () => {
    axios
      .delete(`https://restaurantwebsite-mernstack-1.onrender.com/api/products/${deleteProductId}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== deleteProductId));
        setShowDeleteModal(false);
      })
      .catch((error) => {
        setError('Failed to delete product.');
        setShowDeleteModal(false);
      });
  };

  // Handle Edit Product
  const handleEdit = (id) => {
    console.log("Redirect to edit product", id);
    // Navigate to edit product page
  };

  // Handle Search Filter
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter(product => product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()))
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Add Product (Redirect to add product page)
  const handleAddProduct = () => {
    console.log('Redirect to add new product');
    // Navigate to add product page
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* Summary Stats (Item Count, User Count, Orders Count) */}
      <div className="summary-stats">
        <Card>
          <Card.Body>
            <Card.Title>Items Count</Card.Title>
            <Card.Text>{itemCount}</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>User Count</Card.Title>
            <Card.Text>{userCount}</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Orders Count</Card.Title>
            <Card.Text>{ordersCount}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <Button variant="primary" onClick={handleAddProduct}>
              <FaPlus /> Add Product
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Item</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product._id}>
                  <td><img src={product.image_url} alt="" /></td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(product._id)}>
                      <FaEdit />
                    </Button>
                    <Button variant="danger" onClick={() => setDeleteProductId(product._id)} style={{ marginLeft: '10px' }} data-bs-toggle="modal" data-bs-target="#deleteModal">
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination>
            {[...Array(Math.ceil(products.length / productsPerPage))].map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Dashboard;
