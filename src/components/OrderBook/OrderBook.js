import React, { useState } from 'react';
import './OrderBook.css';

const OrderBook = ({ orderBook }) => {
  const [aggregation, setAggregation] = useState(0.01);

  const aggregateOrders = (orders) => {
    const aggregated = {};
    orders.forEach(([price, size]) => {
      const parsedPrice = parseFloat(price);
      const parsedSize = parseFloat(size);
      if (isNaN(parsedPrice) || isNaN(parsedSize)) {
        console.warn('Invalid order data:', price, size);
        return;
      }

      const roundedPrice = Math.floor(parsedPrice / aggregation) * aggregation;
      if (!aggregated[roundedPrice]) aggregated[roundedPrice] = 0;
      aggregated[roundedPrice] += parsedSize;
    });
    return Object.entries(aggregated).map(([price, size]) => [parseFloat(price), size]);
  };

  return (
    <div className="order-book">
      <h3>Order Book (Ladder)</h3>
      <div className="aggregation-controls">
        <label>Aggregation:</label>
        <select value={aggregation} onChange={(e) => setAggregation(parseFloat(e.target.value))}>
          <option value={0.01}>0.01</option>
          <option value={0.05}>0.05</option>
          <option value={0.10}>0.10</option>
        </select>
      </div>
      <div className="order-book-container">
        <div className="order-book-section">
          <h4>Bids</h4>
          {aggregateOrders(orderBook.bids).map(([price, size], index) => (
            <div key={`bid-${index}`} className="order-book-row bid-row">
              <span className="price">Price: {price.toFixed(2)}</span>
              <span className="size">Quantity: {size.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="order-book-section">
          <h4>Asks</h4>
          {aggregateOrders(orderBook.asks).map(([price, size], index) => (
            <div key={`ask-${index}`} className="order-book-row ask-row">
              <span className="price">Price: {price.toFixed(2)}</span>
              <span className="size">Quantity: {size.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
