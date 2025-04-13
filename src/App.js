import React, { useState, useEffect } from 'react';
import { Card, Container, Modal, Button, ListGroup, Badge, Form } from 'react-bootstrap';
import Name from './components/Name';
import Price from './components/Price';
import Description from './components/Description';
import Image from './components/Image';
import './App.css';

// Product details
const product = {
  name: 'Stylish Sneakers',
  price: 129.99,
  description: 'Sleek, comfy, and perfect for every step you take. Limited edition drop!',
  imgUrl: 'https://images.unsplash.com/photo-1606813902544-b0c7f56152b0?auto=format&fit=crop&w=600&q=80',
};

// Provide your first name here
const firstName = "Stephen"; // Change this to "" or null if not provided

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = () => {
    const existingIndex = cart.findIndex(item => item.name === product.name && item.price === product.price);
    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (name) => {
    setCart(cart.filter(item => item.name !== name));
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const getTotalPrice = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleConfirmPayment = () => {
    setPaymentSuccess(true);
    setCart([]);
    setShowCheckout(false);
  };

  return (
    <Container className="mt-5">
      <div className="text-center mb-4">
        <Button variant="outline-primary" onClick={() => setShowCart(true)}>
          View Cart <Badge bg="primary">{cart.reduce((acc, item) => acc + item.quantity, 0)}</Badge>
        </Button>
      </div>

      <Card style={{ width: '22rem', margin: 'auto', boxShadow: '0px 0px 15px rgba(0,0,0,0.1)' }}>
        <Card.Body className="text-center">
          <Image src={product.imgUrl} alt={product.name} />
          <Name name={product.name} />
          <Price price={`$${product.price}`} />
          <Description description={product.description} />
          <Button variant="dark" className="w-100 rounded-3" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>

      {/* Greeting Section */}
      <div className="text-center mt-4">
        <h4>{firstName ? `Hello, ${firstName}!` : 'Hello, there!'}</h4>
      </div>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={() => setShowCart(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <ListGroup>
              {cart.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>
                    <div>Price: ${item.price}</div>
                    <div>Quantity: {item.quantity}</div>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(item.name)}>
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div><strong>Total: ${getTotalPrice()}</strong></div>
          <Button variant="secondary" onClick={() => setShowCart(false)}>Close</Button>
          <Button variant="primary" onClick={() => { setShowCart(false); setShowCheckout(true); }}>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Checkout Modal */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {paymentSuccess ? (
            <div className="text-center">
              <h4>Payment Successful!</h4>
              <p>Thank you for your order, {customerInfo.name}!</p>
              <Button variant="primary" onClick={() => window.location.reload()}>Go to Home</Button>
            </div>
          ) : (
            <>
              <h5>Order Summary</h5>
              <ListGroup>
                {cart.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <div>
                      <strong>{item.name}</strong>
                      <div>Price: ${item.price}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="mt-3">
                <h5>Total Price: ${getTotalPrice()}</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleConfirmPayment}>Confirm Payment</Button>
                </Form>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
