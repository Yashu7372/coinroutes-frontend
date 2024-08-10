CoinRoutes is a real-time cryptocurrency tracking web application that displays live data from Coinbase Pro. It features various widgets to show real-time price information, historical data, and an order book with bid and ask prices.

Features
Top of Book: Displays the best bid and ask prices along with their respective quantities and spread.
Real-Time Price Chart: Shows a line chart of the best bid and ask prices over time.
Order Book: Displays aggregated bids and asks with adjustable aggregation levels.
Currency Selector: Allows users to switch between different cryptocurrency pairs.
Technologies Used
React: Front-end framework for building user interfaces.
Recharts: Charting library for visualizing data.
Coinbase Pro WebSocket API: For real-time data streaming.
Coinbase Pro REST API: For fetching historical data.
Installation
To set up and run this application locally, follow these steps:

Clone the Repository

bash
Copy code
git clone https://github.com/your-username/coinroutes.git
cd coinroutes
Install Dependencies

Ensure you have Node.js installed. Then, run:

bash
Copy code
npm install
Start the Development Server

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Usage
Select a Cryptocurrency Pair

Use the dropdown menu to choose a cryptocurrency pair from the available options.

View Real-Time Data

The Top of Book widget will display the best bid and ask prices along with their quantities. The Price Chart will show a real-time line chart of these prices. The Order Book will show aggregated bid and ask prices with adjustable aggregation levels.

Adjust Aggregation

In the Order Book widget, you can change the aggregation level to view more or less detailed bid and ask prices.

Contributing
Contributions are welcome! Please open an issue or submit a pull request with improvements or bug fixes.

Fork the Repository

Click the "Fork" button at the top-right corner of this repository page.

Create a New Branch

bash
Copy code
git checkout -b feature/your-feature
Make Your Changes

Commit Your Changes

bash
Copy code
git add .
git commit -m "Add a descriptive commit message"
Push to Your Fork

bash
Copy code
git push origin feature/your-feature
Submit a Pull Request

Go to the original repository and click "New Pull Request".
