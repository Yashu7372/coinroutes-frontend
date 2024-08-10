import React from 'react';
import './TopOfBook.css'; 

const TopOfBook = ({ topOfBook, volume24h }) => {
  const spread = (topOfBook.bestAsk - topOfBook.bestBid).toFixed(2);
  
  return (
    <div className="top-of-book">
      <h3 className="title">Top of Book</h3>
      <div className="data-item">
        <span className="label">Best Bid:</span>
        <span className="value">${topOfBook.bestBid.toFixed(2)}</span>
        <span className="quantity">Quantity: {topOfBook.bestBidSize.toFixed(2)}</span>
      </div>
      <div className="data-item">
        <span className="label">Best Ask:</span>
        <span className="value">${topOfBook.bestAsk.toFixed(2)}</span>
        <span className="quantity">Quantity: {topOfBook.bestAskSize.toFixed(2)}</span>
      </div>
      <div className="data-item">
        <span className="label">Spread:</span>
        <span className="value">${spread}</span>
      </div>
      {volume24h !== null && volume24h !== undefined && (
        <div className="data-item">
          <span className="label">24 Hour Volume:</span>
          <span className="value">{volume24h}</span>
        </div>
      )}
    </div>
  );
};

export default TopOfBook;
