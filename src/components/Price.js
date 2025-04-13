// src/components/Price.js
import React from 'react';
import product from '../product';

function Price() {
  return <p className="text-primary fw-bold">{product.price}</p>;
}

export default Price;
