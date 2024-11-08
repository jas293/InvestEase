import React, { useEffect, useState } from 'react';
import '../style/dashboard.css';

const StockDashboard = () => {

import React, { useEffect, useState, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useNavigate, Link } from 'react-router-dom';
import '../style/dashboard.css';
import { time } from 'console';
import TradingViewWidget from './components/ChartWidget';
// import ../'

const STOCK_SYMBOL_LIST = [
  'AAPL',
  'ABNB',
  'ADBE',
  'AMZN',
  'CCEP',
  'GOOGL',
  'MSFT',
  'META',
  'TSLA',
  'NFLX',
  'NVDA',
  'WDAY',
  'ZS',
  'WBD',
  'SBUX',
  'PEP',
  'LULU',
  'GEHC',
  'EA',
]

type CompanyInfomaton = {
  symbol: String
  companyName: String
  price: String
  change: Number
  stockImageUrl: String
}

// type StockCompanyInfo = {
//   symbol: String,
//   companyInfo: CompanyInfomaton
// }

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = 'white',
      lineColor = '#2962FF',
      textColor = 'black',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
  } = props

  const chartContainerRef = useRef()

  useEffect(
    //chartContainerRef.current.clientWidth
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: 960 })
      }

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: 960,
        height: 640,
      })
      chart.timeScale().fitContent()

      const newSeries = chart.addAreaSeries({
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
      })
      newSeries.setData(data)

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)

        chart.remove()
      }
    },
    [
      data,
      backgroundColor,
      lineColor,
      textColor,
      areaTopColor,
      areaBottomColor,
    ],
  )

  return <div ref={chartContainerRef} />
}

const StockDashboard = () => {
  const navigate = useNavigate() // Use useNavigate to get the navigation function

  const [symbol, setSymbol] = useState('NVDA')
  const [authenticated, setAuthenticated] = useState(false)
  const [data, setData] = useState<{ time: string; value: number }[]>([])
  const [stockCompanyInfoData, setStockCompanyInfoData] = useState<
    CompanyInfomaton[]
  >([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [currentStockData, setCurrentStockData] = useState<CompanyInfomaton>({
    symbol: '',
    change: 0,
    price: '',
    stockImageUrl: '',
    companyName: '',
  })

  useEffect(() => {
    console.log('Current Stock data updated')
    console.log(currentStockData)
  }, [currentStockData])

  const [watchlist, setWatchlist] = useState<CompanyInfomaton[]>([
    {
      symbol: 'LULU',
      change: -13.79,
      companyName: 'Lululemon Athletica Inc.',
      price: 'USD 336.13',
      stockImageUrl: 'https://financialmodelingprep.com/image-stock/LULU.png',
    },
    {
      symbol: 'NVDA',
      change: -24.3,
      companyName: 'NVIDIA Corporation',
      price: 'USD 881.86',
      stockImageUrl: 'https://financialmodelingprep.com/image-stock/NVDA.png',
    },
    {
      symbol: 'NFLX',
      change: -5.95,
      companyName: 'Netflix, Inc.',
      price: 'USD 622.83',
      stockImageUrl: 'https://financialmodelingprep.com/image-stock/NFLX.png',
    },
    {
      symbol: 'META',
      change: -11.26,
      companyName: 'Meta Platforms, Inc.',
      price: 'USD 511.9',
      stockImageUrl: 'https://financialmodelingprep.com/image-stock/META.png',
    },
    {
      symbol: 'AMZN',
      change: -2.92,
      companyName: 'Amazon.com, Inc.',
      price: 'USD 186.13',
      stockImageUrl: 'https://financialmodelingprep.com/image-stock/AMZN.png',
    },
  ])

  useEffect(() => {
    // When the component mounts, add a class to the container to hide the half circle
    document.querySelector('.container')?.classList.add('hide-half-circle')

    console.log('First time loading page')
    const token =
      sessionStorage.getItem('token') || localStorage.getItem('token')

    if (token) {
      setAuthenticated(true)
      fetchUserData()
    }
    // getData();
    // getTopGainersAndLosersList();

    // getStocksList();
    // getCompanyData()

    //getStocksInformation()

    // When the component unmounts, remove the class
    return () => {
      document.querySelector('.container')?.classList.remove('hide-half-circle')
    }
  }, [])

  const fetchUserData = async () => {
    try {
      const resp = await httpClient.get('//localhost:5000/@me')
      const userData = resp.data
      setName(userData.name)
      setEmail(userData.email)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User's Data Not Found")
      } else {
        console.error('An error occurred while loading user data:', error)
      }
    }
  }

  const getStocksInformation: Function = async () => {
    let stockCompanyInfo: CompanyInfomaton[] = []
    const response = Promise.all(
      STOCK_SYMBOL_LIST.map(async (symb) => {
        const url = `https://financialmodelingprep.com/api/v3/profile/${symb}?apikey=Dyp3TT8Lv8XQIATP59v7Y4eIr9Fl9h1E`
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        }
        const res = await fetch(url, requestOptions)
        const resJson = await res.json()
        let companyInfo: CompanyInfomaton = {
          symbol: '',
          change: 0,
          price: '',
          stockImageUrl: '',
          companyName: '',
        }
        companyInfo['symbol'] = symb
        companyInfo['companyName'] = resJson[0]['companyName']
        companyInfo[
          'price'
        ] = `${resJson[0]['currency']} ${resJson[0]['price']}`
        companyInfo['change'] = resJson[0]['changes']
        companyInfo['stockImageUrl'] = resJson[0]['image']
        stockCompanyInfo.push(companyInfo)
      }),
    ).then((result) => {
      console.log('Company Info Fetched', stockCompanyInfo)
      setStockCompanyInfoData(stockCompanyInfo)
      // getData(stockCompanyInfo[0].symbol)
      setCurrentStockData(stockCompanyInfo[0])
    })
  }

  const getCompanyData: Function = async () => {
    const url =
      'https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=Dyp3TT8Lv8XQIATP59v7Y4eIr9Fl9h1E'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('Stock Company Data APPLE')
        console.log(result)
        // we need symbol, price, changes, companyName, currency, image
      })

    /**
     * [
  {
    "symbol": "AAPL",
    "price": 175.04,
    "beta": 1.276,
    "volAvg": 60278960,
    "mktCap": 2702950176000,
    "lastDiv": 0.96,
    "range": "161.42-199.62",
    "changes": 7.26,
    "companyName": "Apple Inc.",
    "currency": "USD",
    "cik": "0000320193",
    "isin": "US0378331005",
    "cusip": "037833100",
    "exchange": "NASDAQ Global Select",
    "exchangeShortName": "NASDAQ",
    "industry": "Consumer Electronics",
    "website": "https://www.apple.com",
    "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California.",
    "ceo": "Mr. Timothy D. Cook",
    "sector": "Technology",
    "country": "US",
    "fullTimeEmployees": "161000",
    "phone": "408 996 1010",
    "address": "One Apple Park Way",
    "city": "Cupertino",
    "state": "CA",
    "zip": "95014",
    "dcfDiff": 39.95202,
    "dcf": 131.44797944772984,
    "image": "https://financialmodelingprep.com/image-stock/AAPL.png",
    "ipoDate": "1980-12-12",
    "defaultImage": false,
    "isEtf": false,
    "isActivelyTrading": true,
    "isAdr": false,
    "isFund": false
  }
]
     * 
     */
  }

  const getTopGainersAndLosersList: Function = async () => {
    const url =
      'https://autocomplete.clearbit.com/v1/companies/suggest?query=Apple'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('Stocks Gainers & Losers Result is here')
        console.log(result)
      })
  }

  const getData: Function = async (symbol: String) => {
    // var request = require('request');

    // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&apikey=JUBNCUOA1QM4HTL5`

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('Result of stock API')
        console.log(result)
        const responseStore = result['Time Series (Daily)']
        console.log(responseStore)
        let newData: { time: string; value: number }[] = []
        var arr = []
        for (const key in responseStore) {
          arr.push(key)
        }
        for (let i = arr.length - 1; i >= 0; i--) {
          const property = arr[i]
          // console.log(`${property}: ${responseStore[property]}`);
          let newObj: { time: string; value: number } = {
            time: `${property}`,
            value: Number(responseStore[property]['4. close']),
          }
          newData.push(newObj)
        }
        // console.log("New Object");
        // console.log(newData);
        setData([...newData])
      })
      .catch((error) => console.log('error', error))
  }
  if (!authenticated) {
    return (
      <div className="resultPage">
        <div className="questionnaire_header">
          <h2>InvestEase</h2>
          <Link to="/SignIn">
            <h3>Login</h3>
          </Link>
        </div>
        <h2 className="error_message">Please Login!!</h2>
      </div>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSymbol(event.target.elements.symbolInput.value.toUpperCase())
  }

  function removeCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }
  const handleLogoutSubmit = () => {
    // Remove the token from session storage
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
    removeCookie('session_cookie')
    navigate('/')
  }

  return (
    <div className="dashboard-stock">
      <nav className="top-nav">
        <h2>
          <i className="fas fa-line-chart"></i>InvestEase
        </h2>
        <h1>Dashboard</h1>
        {/*<div className="user-info">Welcome, {name || email}!</div>
      <h3 onClick={handleLogoutSubmit}>Logout</h3>*/}
        <div
          className="user-dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span>
            Welcome, {name.trim() ? name : email}!{' '}
            <i className="fas fa-caret-down"></i>
          </span>
          {dropdownOpen && (
            <div
              className="dropdown-content"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link onClick={handleLogoutSubmit} to="/">
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
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
          <h2><i className="fas fa-line-chart"></i>Investease</h2>
        </header>
        <nav>
          <ul>
            <li><i className="fas fa-home"></i><Link style={{textDecoration: 'none'}} to="/LandingPage">Home</Link></li>
            <li><i className="fas fa-address-book"></i><Link style={{textDecoration: 'none'}} to="/about-us">About us</Link></li>
            <li><i className="fas fa-newspaper"></i><Link style={{textDecoration: 'none'}} to="/resources">News</Link></li>
            <li><i className="fas fa-gear"></i><Link style={{textDecoration: 'none'}} to="/settings">Settings</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Stock Dashboard</h1>
          <div className="user-info">
            Welcome, {name.trim() ? name : email}!
          </div>
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
            <h2>Stocks</h2>
            <div className="stock-info">
                  {stockCompanyInfoData && stockCompanyInfoData.length > 0 && (
                    stockCompanyInfoData.map((companyInfo: CompanyInfomaton) => {
                      return <a className="stock-item" onClick={() => {
                          // getData(companyInfo.symbol)
                          console.log("Symbol Value", companyInfo.symbol);
                          // let companyInfoCurrent: CompanyInfomaton | undefined =  stockCompanyInfoData.find((company) => {
                          //   console.log("Company Symbol", company.symbol);
                          //   return company.symbol === symbol
                          // });
                          // console.log('Current info company', companyInfoCurrent);
                          // if (companyInfoCurrent === undefined) {
                          //   companyInfoCurrent = {
                          //     'symbol': '',
                          //     'change': 0,
                          //     'price': '',
                          //     'stockImageUrl': '',
                          //     'companyName': ''
                          //   };
                          // }
                          setCurrentStockData({
                            'symbol': companyInfo.symbol,
                            'change': companyInfo.change,
                            'companyName': companyInfo.companyName,
                            'price': companyInfo.price,
                            'stockImageUrl': companyInfo.stockImageUrl
                          });
                        }}>
                        <div className='stock-item-row-container'>
                          <div>
                            <img src={companyInfo.stockImageUrl.toString()} style={{maxWidth: '2rem'}} />
                          </div>
                          <div className='company-image-container'>
                            <h4>{companyInfo.companyName}</h4>
                          </div>
                        </div>
                        <div className='stock-item-row-container'>
                          <div>
                            <p>Share Price</p>
                          </div>
                          <div>
                            <p style={{color: 'black'}}>{companyInfo.price}</p>
                          </div>
                        </div>
                        <div className='stock-item-row-container'>
                          <div>
                            <p>Day's change</p>
                          </div>
                          <div className={Number(companyInfo.change) < 0 ? 'stock-change-info stock-negative' : ' stock-change-info stock-positive'}>
                            <p>{companyInfo.change.toString() + '%'}</p>
                            {Number(companyInfo.change) < 0 ? <i className="fas  fa-long-arrow-down"></i> : <i className="fas  fa-long-arrow-up"></i>}
                          </div>
                        </div>
                      </a>
                    })
                  )}
            </div>
        </section>
        <div>
          <div id="watchlist-chart-container">
            <section className="stock-chart">
              <div className="chart-heading-container">
                <div className="chart-heading-image-title-container">
                  <div className="chart-image-container">
                    <img
                      src={currentStockData.stockImageUrl.toString()}
                      style={{ maxWidth: '4rem' }}
                    />
                  </div>
                  <div className="chart-title-sym-container">
                    <h1>{currentStockData.companyName}</h1>
                    <h4>{currentStockData.symbol}</h4>
                  </div>
                </div>
                <div className="chart-price-change-container">
                  <div id="chart-price-container">{currentStockData.price}</div>
                  <div
                    id="chart-change-container"
                    className={
                      Number(currentStockData.change) < 0
                        ? 'stock-negative'
                        : 'stock-positive'
                    }
                  >
                    {currentStockData.change.toString() + '%'}
                    {Number(currentStockData.change) < 0 ? (
                      <i className="fas  fa-long-arrow-down"></i>
                    ) : (
                      <i className="fas  fa-long-arrow-up"></i>
                    )}
                  </div>
                </div>
              </div>
              <div className="chart">
                {/* Whenever a use clicks on any stock I want to show the chart of that stock here in this section inside a box styled like in the other sections. */}
                {/* {data && (
                  <ChartComponent data={data} />
                )} */}
                {currentStockData && currentStockData.symbol !== '' && (
                  <TradingViewWidget symbol={currentStockData.symbol} />
                )}
              </div>
            </section>
            <section className="my-watchlist">
              <div className="watchlist">
                <div className="watch-info">
                  <h2>My Watchlist</h2>
                  <div id="watchlist-item-container">
                    {watchlist.length > 0 &&
                      watchlist.map((item: CompanyInfomaton) => {
                        return (
                          <a
                            className="watch-item"
                            onClick={() => {
                              // getData(item.symbol)
                              setCurrentStockData({
                                symbol: item.symbol,
                                change: item.change,
                                companyName: item.companyName,
                                price: item.price,
                                stockImageUrl: item.stockImageUrl,
                              })
                            }}
                          >
                            <div className="watchlist-stock-name-img-container">
                              <div className="watchlist-image-container">
                                <img
                                  src={item.stockImageUrl.toString()}
                                  style={{ maxWidth: '2.5rem' }}
                                />
                              </div>
                              <div className="watchlist-name-symbol-container">
                                <div className="watchlist-symbol">
                                  {item.symbol}
                                </div>
                                <div className="watchlist-name">
                                  {item.companyName}
                                </div>
                              </div>
                            </div>
                            <div className="watchlist-price-change-container">
                              <div className="watchlist-price">
                                {item.price}
                              </div>
                              <div
                                className={
                                  Number(item.change) < 0
                                    ? 'watchlist-change negative'
                                    : 'watchlist-change positive'
                                }
                              >
                                {item.change.toString() + '%'}
                                {/* {Number(item.change) < 0 ? <i className="fas  fa-long-arrow-down"></i> : <i className="fas  fa-long-arrow-up"></i>} */}
                              </div>
                            </div>
                          </a>
                        )
                      })}
                  </div>
                </div>
              </div>
            </section>
            <section className="stock-analysis">
              <form onSubmit={handleSubmit} className="analysis-form">
                <input
                  type="text"
                  name="symbolInput"
                  placeholder="Enter a symbol here"
                />
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
              <div className="tradingview-widget-container">
                <TechnicalAnalysisWidget symbol={symbol} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StockDashboard
