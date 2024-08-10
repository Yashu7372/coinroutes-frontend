import React from 'react';

const CurrencySelector = ({ selectedPair, onSelectPair }) => {
  return (
    <div className="currency-selector">
      <label style={{color:"blue"}}>Select Currency Pair: </label>
      <select value={selectedPair} onChange={(e) => onSelectPair(e.target.value)}>
        <option value="BTC-USD">BTC-USD</option>
        <option value="ETH-USD">ETH-USD</option>
        <option value="LTC-USD">LTC-USD</option>
        <option value="BCH-USD">BCH-USD</option>
      </select>
    </div>
  );
};

export default CurrencySelector;
