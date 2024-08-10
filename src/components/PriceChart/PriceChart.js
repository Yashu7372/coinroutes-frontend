import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PriceChart = ({ priceData }) => {
  if (!priceData.length) return (
    <div className="price-chart">
      <h3>Real-Time Price Chart</h3>
      <p>Loading...</p>
    </div>
  );

  // Determine the minimum and maximum prices to set the Y-axis range
  const prices = priceData.flatMap(data => [data.bestBid, data.bestAsk]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Set a small buffer to ensure visibility of small changes
  const buffer = (maxPrice - minPrice) * 0.05;
  const yAxisMin = minPrice - buffer;
  const yAxisMax = maxPrice + buffer;

  return (
    <div className="price-chart">
      <h3>Real-Time Price Chart</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[yAxisMin, yAxisMax]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="bestBid"
            stroke="#82ca9d"
            name="Bid"
            dot={{ r: 3, strokeWidth: 1.5 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="bestAsk"
            stroke="#8884d8"
            name="Ask"
            dot={{ r: 3, strokeWidth: 1.5 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
