// src/components/Image.js
import React from 'react';
import product from '../product';

function Image() {
  return (
    <img
      src={product.image}
      alt={product.name}
      className="img-fluid rounded mb-3"
      style={{ maxHeight: '200px', objectFit: 'cover' }}
    />
  );
}

export default Image;
