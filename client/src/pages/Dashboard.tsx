import React, { useEffect, useState, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import '../style/dashboard.css';
import { time } from 'console';


export const ChartComponent = props => {
  const {
      data,
      colors: {
          backgroundColor = 'white',
          lineColor = '#2962FF',
          textColor = 'black',
          areaTopColor = '#2962FF',
          areaBottomColor = 'rgba(41, 98, 255, 0.28)',
      } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(
      () => {
          const handleResize = () => {
              chart.applyOptions({ width: chartContainerRef.current.clientWidth });
          };

          const chart = createChart(chartContainerRef.current, {
              layout: {
                  background: { type: ColorType.Solid, color: backgroundColor },
                  textColor,
              },
              width: chartContainerRef.current.clientWidth,
              height: 300,
          });
          chart.timeScale().fitContent();

          const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
          newSeries.setData(data);

          window.addEventListener('resize', handleResize);

          return () => {
              window.removeEventListener('resize', handleResize);

              chart.remove();
          };
      },
      [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  return (
      <div
          ref={chartContainerRef}
      />
  );
};

const StockDashboard = () => {

  const [data, setData] = useState<{time: string, value: number}[]>([]);

  useEffect(() => {
    // When the component mounts, add a class to the container to hide the half circle
    document.querySelector('.container')?.classList.add('hide-half-circle');

    getData();

    // When the component unmounts, remove the class
    return () => {
      document.querySelector('.container')?.classList.remove('hide-half-circle');
    };
  }, []);
  

  const getData: Function = async () => {
    
    // var request = require('request');

    // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&interval=5min&apikey=4NYJP7J4NKNDWEWF';

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
          // const newsArticles = result["articles"];
          // const filteredArticles = newsArticles.filter(news => {
          //     console.log(news.urlToImage);
          //     return news.urlToImage;
          // })
          // setNewsArticles(filteredArticles);
          console.log("Result of stock API")
          console.log(result)
          const responseStore = result['Time Series (Daily)']
          console.log(responseStore);
          let newData: {time: string, value: number}[] = [];
          var arr = [];
          for (const key in responseStore) {
            // add hasOwnPropertyCheck if needed
            arr.push(key);
          }
          for (let i=arr.length-1; i>=0; i--) {
            // f.call(obj, arr[i]);
            const property = arr[i];
            console.log(`${property}: ${responseStore[property]}`);
            let newObj: {time: string, value: number} = {time: `${property}`, value: Number(responseStore[property]['4. close'])};
            // newObj['time'] = `${property}`;
            newData.push(newObj)  
          }
          // for (const property in responseStore) {
          //   console.log(`${property}: ${responseStore[property]}`);
          //   let newObj: {time: string, value: number} = {time: `${property}`, value: Number(responseStore[property]['4. close'])};
          //   // newObj['time'] = `${property}`;
          //   newData.push(newObj)          
          // }
          // newData.sort((a,b) => Number(a.time) - Number(b.time));
          console.log("New Object");
          console.log(newData);
          setData([...newData]);
      })
      .catch(error => console.log('error', error));

    // request.get({
    //   url: url,
    //   json: true,
    //   headers: {'User-Agent': 'request'}
    // }, (err: any, res: { statusCode: number; }, data: any) => {
    //   if (err) {
    //     console.log('Error:', err);
    //   } else if (res.statusCode !== 200) {
    //     console.log('Status:', res.statusCode);
    //   } else {
    //     // data is successfully parsed as a JSON object:
    //     console.log(data);
    //   }
    // });
  }

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
                <ChartComponent data={data} />
            </div>
        </section>
      </main>
    </div>
  );
};

export default StockDashboard;