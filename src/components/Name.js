// src/components/Name.js
import React from 'react';
import product from '../product';

function Name() {
  return <h5 className="fw-bold">{product.name}</h5>;
}

export default Name;
