import React, { useEffect, useState } from 'react';
import '../style/dashboard.css';


const StockDashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <header className="sidebar-header">
          <h2>Menu</h2>
        </header>
        <nav>
          <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <li>News</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Stock Dashboard</h1>
          <div className="user-info">Welcome, User!</div>
        </header>
        <section className="portfolio">
            <h2>My Portfolio</h2>
            <div className="stock-info">
                <div className="stock-item">
                <p>AAPL</p>
                <p>Apple</p>
                <p>Price: $171</p>
                </div>
                <div className="stock-item">
                <p>TSLA</p>
                <p>Tesla</p>
                <p>Price: $900</p>
                </div>
                <div className="stock-item">
                <p>MSFT</p>
                <p>Microsoft</p>
                <p>Price: $300</p>
                </div>
                <div className="stock-item">
                <p>AMZN</p>
                <p>Amazon</p>
                <p>Price: $3200</p>
                </div>
                <div className="stock-item">
                <p>GOOGL</p>
                <p>Google</p>
                <p>Price: $2000</p>
                </div>
                <div className="stock-item">
                <p>GOOGL</p>
                <p>Google</p>
                <p>Price: $2000</p>
                </div>
                <div className="stock-item">
                <p>GOOGL</p>
                <p>Google</p>
                <p>Price: $2000</p>
                </div>
                <div className="stock-item">
                <p>GOOGL</p>
                <p>Google</p>
                <p>Price: $2000</p>
                </div>
                <div className="stock-item">
                <p>GOOGL</p>
                <p>Google</p>
                <p>Price: $2000</p>
                </div>
                <div className="stock-item">
                <p>GOOGL</p>
                <p>Google</p>
                <p>Price: $2000</p>
                </div>
                <div className="stock-item">
                <p>GOOGL</p>
                <p>Google</p>
                <p>Price: $2000</p>
                </div>
                <div className="stock-item">
                <p>GOOGL</p>
                <p>Google</p>
                <p>Price: $2000</p>
                </div>

            </div>
        </section>
        <section className='My Watchlist'>
        <div className="watchlist">
            <div className="watch-info">
            <h2>My Watchlist</h2>
                <div className="watch-item">
                    <p>FB</p>
                    <p>Facebook</p>
                    <p>Price: $350</p>
                </div>
                <div className="watch-item">
                    <p>NFLX</p>
                    <p>Netflix</p>
                    <p>Price: $550</p>
                </div>
                <div className="watch-item">
                    <p>AMZN</p>
                    <p>Amazon</p>
                    <p>Price: $3200</p>
                </div>
                <div className="watch-item">
                    <p>GOOGL</p>
                    <p>Google</p>
                    <p>Price: $2000</p>
                </div>
                <div className="watch-item">
                    <p>MSFT</p>
                    <p>Microsoft</p>
                    <p>Price: $300</p>
                </div>
                <div className="watch-item">
                    <p>MSFT</p>
                    <p>Microsoft</p>
                    <p>Price: $300</p>
                </div>
                <div className="watch-item">
                    <p>MSFT</p>
                    <p>Microsoft</p>
                    <p>Price: $300</p>
                </div>
                <div className="watch-item">
                    <p>MSFT</p>
                    <p>Microsoft</p>
                    <p>Price: $300</p>
                </div>
                <div className="watch-item">
                    <p>MSFT</p>
                    <p>Microsoft</p>
                    <p>Price: $300</p>
                </div>
                <div className="watch-item">
                    <p>MSFT</p>
                    <p>Microsoft</p>
                    <p>Price: $300</p>
                </div>
            </div>
        </div>
        </section>
        <section className="stock-chart">
            <h2>Stock Chart</h2>
            <div className="chart">
                {/* Whenever a use clicks on any stock I want to show the chart of that stock here in this section inside a box styled like in the other sections. */}
            </div>
        </section>
      </main>
    </div>
  );
};

export default StockDashboard;