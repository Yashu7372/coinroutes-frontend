import { useState, useEffect } from 'react';

const useCryptoData = (selectedPair) => {
  const [topOfBook, setTopOfBook] = useState({ bestBid: 0, bestAsk: 0, bestBidSize: 0, bestAskSize: 0 });
  const [priceData, setPriceData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [volume24h, setVolume24h] = useState(null);

  useEffect(() => {
    let ws;

    const setupWebSocket = () => {
      ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
      const subscribeMessage = {
        type: 'subscribe',
        product_ids: [selectedPair],
        channels: ['ticker', 'level2_batch'],
      };

      ws.onopen = () => {
        ws.send(JSON.stringify(subscribeMessage));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'ticker') {
          const bestBid = parseFloat(data.best_bid);
          const bestAsk = parseFloat(data.best_ask);

          setTopOfBook({
            bestBid,
            bestAsk,
            bestBidSize: parseFloat(data.best_bid_size),
            bestAskSize: parseFloat(data.best_ask_size),
          });

          setPriceData(prevData => [
            ...prevData.slice(-19), // Keep the last 20 data points
            {
              time: new Date().toLocaleTimeString(),
              bestBid,
              bestAsk,            },
          ]);
          setVolume24h(data.volume_24h || volume24h);
        } else if (data.type === 'l2update') {
          setOrderBook({
            bids: data.changes.filter(change => change[0] === 'buy').map(change => [parseFloat(change[1]), parseFloat(change[2])]),
            asks: data.changes.filter(change => change[0] === 'sell').map(change => [parseFloat(change[1]), parseFloat(change[2])]),
          });
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    };

    const fetchHistoricalData = () => {
      const url = `https://api.pro.coinbase.com/products/${selectedPair}/candles?granularity=86400`;

      fetch(url)
        .then(response => {
          // Check if the response is OK (status code 200-299)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const formattedData = data.map(candle => ({
            time: new Date(candle[0] * 1000).toLocaleTimeString(),
            price: parseFloat(candle[4]),
          }));
          setHistoricalData(formattedData);
        })
        .catch(error => {
          console.error('Error fetching historical data:', error);
        });
    };

    // Reset states when the currency pair changes
    setPriceData([]);
    setHistoricalData([]);

    setupWebSocket();
    fetchHistoricalData();

    return () => {
      if (ws) ws.close(); // Cleanup WebSocket connection
    };
  }, [selectedPair]); // Remove volume24h from dependencies

  return { topOfBook, priceData, historicalData, orderBook, volume24h };
};

export default useCryptoData;
