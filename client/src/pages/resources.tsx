import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoThumbnail from './videoThumbnail';


const Card = (card: any) => {
    return (
        <a 
            className='card'
            href={card.link}
            target='"_blank'
        >
             <h3>
                {card.title}
            </h3>
            <div>
                <p>{card.content}</p>
            </div>
        </a>
    )
}

const NewsCard = (news: any) => {
    return (
        <a
            className='news-card'
            href={news.url}
            target='_blank'
        >
            <div className='news-image-container'>
                <img className="news-image" src={news.urlToImage} alt="News Image" />
            </div>
            <h3>
                {news.title}
            </h3>
            <div>
                <p>{news.description}</p>
            </div>
        </a>
    )
}

const FlexContainer = ({children} ) => (
    <div className="flex-container">{children}</div>
);

const getDateString = (numOfDays: number|null|undefined = null) => {
    let currentDate = new Date();
    if (numOfDays) {
        currentDate = new Date(currentDate.getTime() - (numOfDays * 24 * 60 * 60 * 1000));
    }
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const fullDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    console.log(fullDate); // Output: YYYY-MM-DD
}


export const Resources: React.FC = () => {

    useEffect(() => {
        // When the component mounts, add a class to the container to hide the half circle
        document.querySelector('.container')?.classList.add('hide-half-circle');
    
        // When the component unmounts, remove the class
        return () => {
          document.querySelector('.container')?.classList.remove('hide-half-circle');
        };
      }, []);

    const navigate = useNavigate();
    const [newsArticles, setNewsArticles] = useState([]);
    const [newsLoaded, setNewsLoaded] = useState(false);
    const cardData: any = [
        {
            id: 1,
            link: "https://www.investopedia.com/terms/s/stockmarket.asp",
            heading: "What Is the Stock Market, What Does It Do, and How Does It Work?",
            content: "This concise article elucidates the stock market's definition, function, and operational dynamics, making it accessible to beginners and those curious about its inner workings."
        },
        {
            id: 2,
            link: "https://www.td.com/ca/en/investing/direct-investing/articles/what-is-stock-market",
            heading: "Stock Market 101",
            content: "When you hear about the stock market does it feel like you’re listening to a different language? One you really want to learn but just can’t seem to grasp? You’re not alone, that’s for sure. We can help you understand what a stock market is, and how it works so the thought of investing seems less overwhelming."
        },
        {
            id: 3,
            link: "https://www.td.com/ca/en/investing/direct-investing/articles/how-to-buy-stocks",
            heading: "How to Buy Stocks?",
            content: "Stocks are a popular form of investing these days. It helps to understand how to buy stocks before deciding whether or not investing in stocks is right for you."
        },
        {
            id: 4,
            link: "https://www.nerdwallet.com/article/investing/what-is-the-stock-market",
            heading: "What Is the Stock Market?",
            content: "The stock market is where investors connect to buy and sell investments — most commonly, stocks, which are shares of ownership in a public company."
        },
        {
            id: 5,
            link: "https://en.wikipedia.org/wiki/Glossary_of_stock_market_terms",
            heading: "Glossary of stock market terms",
            content: "This article succinctly defines and explains key terms essential for navigating the complexities of the stock market, serving as a valuable reference for both novice and seasoned investors alike."
        },
        {
            id: 6,
            link: "https://www.prudential.com/financial-education/glossary-of-economic-and-stock-market-terms",
            heading: "The economic and stock market terms you should know",
            content: "If you're not a professional investor, it can seem like financial news is in a completely different language. Investing, like any specialized field, has its own jargon. To help you understand what's going on and make more informed investment decisions, here’s a glossary of key financial terms."
        },
        {
            id: 7,
            link: "https://www.td.com/ca/en/investing/direct-investing/articles/bonds",
            heading: "Understanding Bonds: A Step-by-Step Guide",
            content: "This article will help explain what bonds are and how they can be used to help with your investing knowledge."
        },
        {
            id: 8,
            link: "https://www.nasdaq.com/articles/introducing-the-interns-guide-to-etfs",
            heading: "Introducing the Intern’s Guide to ETFs",
            content: "This guide provides interns with a comprehensive introduction to Exchange-Traded Funds (ETFs), covering their definition, benefits, and operational mechanisms in a concise and accessible format, empowering them to understand and potentially invest in this popular financial instrument."
        },
        {
            id: 9,
            link: "https://www.chase.com/personal/investments/learning-and-insights/article/what-are-mutual-funds",
            heading: "Exploring mutual funds",
            content: "Delve into the world of mutual funds with this insightful guide, offering an exploration of their structure, benefits, and investment strategies, tailored for both newcomers and seasoned investors seeking to diversify their portfolios effectively."
        },
        {
            id: 10,
            link: "https://www.nerdwallet.com/article/investing/how-to-start-investing",
            heading: "How to Start Investing in 2024",
            content: "To get started investing, pick a strategy based on the amount you'll invest, the timelines for your investment goals and the amount of risk that makes sense for you."
        },
        {
            id: 11,
            link: "https://www.nerdwallet.com/article/investing/investment-portfolio",
            heading: "Investment Portfolio: What It Is and How to Build a Good One",
            content: "Investment portfolios don't have to be complicated. You can use funds or even a robo-advisor to build a simple and effective portfolio."
        },
        {
            id: 12,
            link: "https://www.investopedia.com/articles/03/072303.asp",
            heading: "5 Tips for Diversifying Your Portfolio",
            content: "Read on to find out why diversification is important for your portfolio and five tips to help you make smart choices."
        },
        {
            id: 13,
            link: "https://www.cnbc.com/select/how-beginner-investors-can-build-their-investment-portfolio/",
            heading: "Beginner investors guide to an investment portfolio",
            content: "This article presents a step-by-step guide for beginner investors, outlining practical strategies and tips to construct a well-rounded investment portfolio, ensuring a solid foundation for long-term financial growth and success in the dynamic world of investing."
        },
        {
            id: 14,
            link: "https://www.fool.com/investing/how-to-invest/portfolio-investment/",
            heading: "How to Build an Investment Portfolio?",
            content: "You don't need to be wealthy to succeed at portfolio investment. But, for your investment portfolio's returns to match or even outperform the broader stock market, you need some basic knowledge about how to invest. Let's go through the basics of how to build a solid investment portfolio and pick good stocks for beginner investors."
        },
        {
            id: 15,
            link: "https://www.chase.com/personal/investments/learning-and-insights/article/asset-allocation-and-why-it-matters",
            heading: "Asset allocation and why it matters",
            content: "This article elucidates the critical concept of asset allocation, exploring its importance in investment planning and offering practical strategies to optimize portfolio diversification, enabling investors to navigate market fluctuations with confidence."
        },
        {
            id: 16,
            link: "https://www.ayco.com/insights/articles/what-is-risk-tolerance.html",
            heading: "What is risk tolerance and how does it impact my portfolio?",
            content: "What do you do when you see a dip in your portfolio? Do you sell or weather the storm? How you respond can reveal your risk tolerance. Understanding your risk tolerance can help you put together an investment portfolio mix that reflects your financial goals and the type of investor you are."
        }
    ];

    const videosData: any = [
        {
            id: 1,
            videoId: "p7HKvqRI_Bo",
            heading: "How does the stock market work? - Oliver Elfenbaum"
        },
        {
            id: 2,
            videoId: "7IBzTZqeyo0",
            heading: "Stock Trading Strategies for Beginners"
        },
        {
            id: 3,
            videoId: "T1cqSZUviiQ",
            heading: "Investing | 5 Steps for Getting Started"
        },
        {
            id: 4,
            videoId: "qIw-yFC-HNU",
            heading: "The Basics of Investing (Stocks, Bonds, Mutual Funds, and Types of Interest)"
        },
        {
            id: 5,
            videoId: "qDZw_iKzJlI",
            heading: "Investment Risk and Its Types"
        },
        {
            id: 6,
            videoId: "4KGvoy_Ke9Y",
            heading: "Financial Education: Risk & Return"
        },
        {
            id: 7,
            videoId: "ZhJB0cQl1a4",
            heading: "How to Build an Investing Portfolio For Beginners"
        },
        {
            id: 8,
            videoId: "Ivi37nRNyxY",
            heading: "What is Asset Allocation?"
        }
    ];

    const renderCards = () => {
        const rows = [];
        let row: any|[] = [];
        cardData.slice(0,15).forEach((card: any, index: number) => {
          if (index > 0 && index % 3 === 0) {
            rows.push(row);
            row = [];
          }
          row.push(<Card key={card.id} title={card.heading} content={card.content} link={card.link} />);
        });
        rows.push(row); // Push the last row
        return rows.map((row, index) => (
          <div key={index} className="flex-row">
            {row}
          </div>
        ));
      };

    const renderVideos = () => {
        const rows = [];
        let row: any|[] = [];
        videosData.forEach((video: any, index: number) => {
        //   if (index > 0 && index % 3 === 0) {
            // rows.push(row);
            // row = [];
        //   }
         
          row.push(<VideoThumbnail key={video.id} videoId={video.videoId} title={video.heading}  />);
        });
        rows.push(row); // Push the last row
        return rows.map((row, index) => (
          <div key={index} className="flex-row" style={{overflowX: 'scroll'}}>
            {row}
          </div>
        ));
      }

      useEffect(() => {
        getTopNews()
        getDateString();
        getDateString(5)
      }, []);
      
    const getTopNews = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://newsapi.org/v2/everything?q=stock market&from=${getDateString(19)}&to=${getDateString()}&sortBy=popularity&apiKey=001528c1abbd40de90d680eb928de0b4&domains=cnbc.com`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const newsArticles = result["articles"];
                const filteredArticles = newsArticles.filter(news => {
                    console.log(news.urlToImage);
                    return news.urlToImage;
                })
                setNewsArticles(filteredArticles);
            })
            .catch(error => console.log('error', error));
    }

    const renderNewsCard = () => {
        const rows = [];
        let row: any|[] = [];
        newsArticles.slice(0,8).forEach((newsCard: any, index: number) => {
          if (index > 0 && index % 4 === 0) {
            rows.push(row);
            row = [];
          }
          row.push(<NewsCard key={index} url={newsCard.url} urlToImage={newsCard.urlToImage} title={newsCard.title} description={newsCard.description} />);
        });
        rows.push(row);
        return rows.map((row, index) => (
          <div key={index} className="flex-row">
            {row}
          </div>
        ));
    }

    useEffect(() => {
        if (newsArticles && newsArticles.length > 0) {
            setNewsLoaded(true);
        }
    }, [newsArticles])

    return (
        <div className='main-resource-container'>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                <div className='main-heading-container'>
                    <div className='main-heading-container-extend'>
                    <div className='main-heading'>
                        <h1>Resources and Education</h1>
                    </div>        
                    <div >
                        <h4 className='resource-page-subheading'>Collection of all good articles about investing</h4>
                    </div>
                    </div>
                </div>
                <div className='articles-container'>
                    <div className='articles-heading-container'>
                        <div className='articles-heading'>
                            <h2>Articles</h2>
                        </div>
                        <div>
                            <h4 className='resource-page-subheading'>Collections of informative articles to read about investements & stocks.</h4>
                        </div>
                    </div>
                    
                    <FlexContainer>{renderCards()}</FlexContainer>
                </div>
                 <div className='featured-videos'>
                    <div className='featured-videos-container'>
                    <div className='featured-videos-heading-container'>
                        <div className='featured-videos-heading'>
                            <h2>Featured Videos</h2>
                        </div>
                        <div className='featured-videos-subheading'>
                            <h4 className='resource-page-subheading'>Explore fearured videos to learn more about stocks & investemets.</h4>
                        </div>
                    </div>
                    <FlexContainer>{renderVideos()}</FlexContainer>
                    </div>
                </div>
                {newsLoaded && 
                    (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div className='top-stories-headline-container'>
                                <div className='top-stories-headline'>
                                    <h2>Top Headlines</h2>
                                </div>
                                <div className='top-stories-subheading'>
                                    <h4 className='resource-page-subheading'>Find new, handpicked news you’ll love, updated daily.</h4>
                                </div>
                            </div>
                            <FlexContainer>{renderNewsCard()}</FlexContainer>
                        </div>
                    )
                }   
            </div>
        </div>
    )
}
export default Resources;