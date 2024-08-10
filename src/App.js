import React, { useState } from 'react';
import CurrencySelector from './components/CurrencySelector/CurrencySelector';
import TopOfBook from './components/TopOfBook/TopOfBook';
import PriceChart from './components/PriceChart/PriceChart';
import OrderBook from './components/OrderBook/OrderBook';
import useCryptoData from './hooks/useCryptoData';
import './App.css';

const App = () => {
  const [selectedPair, setSelectedPair] = useState('BTC-USD');
  const { topOfBook, priceData, orderBook, volume24h } = useCryptoData(selectedPair);

  const handleCurrencyChange = (pair) => {
    setSelectedPair(pair);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CoinRoutes</h1>
      </header>
      <CurrencySelector selectedPair={selectedPair} onSelectPair={handleCurrencyChange} />
      <div className="widgets">
        <TopOfBook topOfBook={topOfBook} volume24h={volume24h} />
        <PriceChart priceData={priceData} />
        <OrderBook orderBook={orderBook} />
      </div>
    </div>
  );
};

export default App;
