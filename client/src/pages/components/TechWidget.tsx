import React, { useEffect, useRef} from 'react';

function TechnicalAnalysisWidget({ symbol}: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure container.current is not null before accessing it
  if (container.current) {
    const scriptId = 'tradingview-widget-script';
    let oldScript = document.getElementById(scriptId);
    if (oldScript) {
      oldScript.remove();
    }
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          "interval": "1m",
          "width": 350,
          "isTransparent": false,
          "height": 350,
          "symbol": `NASDAQ:${symbol}`,
          "showIntervalTabs": true,
          "displayMode": "single",
          "locale": "en",
          "colorTheme": "light"
        });

        container.current.appendChild(script);
    }
}, [symbol]); 

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"></a>    
      </div>
    </div>
  );
}
export default TechnicalAnalysisWidget;