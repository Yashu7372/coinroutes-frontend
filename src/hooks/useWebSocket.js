import { useEffect } from 'react';

const useWebSocket = (currencyPair, onTickerUpdate, onOrderBookUpdate) => {
  useEffect(() => {
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
    const subscribeMessage = {
      type: 'subscribe',
      product_ids: [currencyPair],
      channels: ['ticker', 'level2_batch'],
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'ticker') {
        onTickerUpdate(data);
      } else if (data.type === 'l2update') {
        onOrderBookUpdate(data);
      }
    };

    return () => {
      ws.close();
    };
  }, [currencyPair, onTickerUpdate, onOrderBookUpdate]);
};

export default useWebSocket;
