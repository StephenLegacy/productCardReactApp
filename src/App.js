// src/App.js
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Name from './components/Name';
import Price from './components/Price';
import Description from './components/Description';
import Image from './components/Image';

// Provide your first name here
const firstName = "Stephen"; // Change to "" if no name

function App() {
  return (
    <Container className="mt-5">
      <Card style={{ width: '22rem', boxShadow: '0px 0px 15px rgba(0,0,0,0.1)' }}>
        <Card.Body className="text-center">
          <Image />
          <Name />
          <Price />
          <Description />
        </Card.Body>
      </Card>

      <div className="text-center mt-3">
        <h4>
          {firstName ? `Hello, ${firstName}!` : 'Hello, there!'}
        </h4>
        {firstName && (
          <img
            src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"
            alt="greeting"
            style={{ width: "200px", marginTop: "10px" }}
          />
        )}
      </div>
    </Container>
  );
}

export default App;
