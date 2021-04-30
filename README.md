
# StoX-frontend #

___For my latest work, please visit my [personal website](https://www.mattaquino.dev/)___

Stox was built with a React frontend, Rails backend, Redux for  state management and the Semantic UI CSS Framework.

It is a stock screener and stock quoting app which allows you to create lists of stocks depending on what you’re interested in.

___The app can be found [here](stoxx.netlify.app)___

***Please give heroku servers ~30 seconds to wake up before making searches on the app***

Some other notable features include:
* A user can have multiple lists and switch their main list.
* Depending on their main list the news hub will update with articles related to that list.
* The articles will have summaries once you click on the section in the news hub and if you click on the title of article it will take you to the sources website
* Below the new hub is a data visual called a treemap which takes into account the 11 major sectors in the S&P500 and creates a gradient based on their daily performance.
* The search bar only takes inputs of stock tickers / symbols. If you input TESLA it will suggest tickers similar to to the input value. If the API cannot determine any suitable suggestions the page will re-render and empty the search bar.
* There are 2 charts in the stock info page that you can toggle between. The first chart displays the price and volume being traded at minute intervals throughout the day and the second chart is a candlechart displaying highs, lows, opens, and closes at those minute intervals.
* The general info for each stock along with the chart data was pulled from the IEX Cloud API. 
* 3 APIs were used to support StoX's functions, all calls were made in the backend. The frontend only needed to speak with the rails backend where all the data was manipulated and reformatted into the desired structures.
* The bottom stock suggestion section updates based on what stock you are currently viewing e.g. TSLA would have suggestions like Ford, GM, Honda, and Toyota since they're all considered car companies. Tech companies will refer other tech companies and so on.
* There's also a public forum tab. When you create lists you can set them to public or private, public lists will show up in the forum and can be voted upon by other users. 

<!-- I created this app because I wanted to work with the IEX Cloud API. My approach was to minimize the amount of API calls but still pull as much pertinent information. The IEX Exchange is the best resource for free financial data, their credit system also doesn't stifle developers with a rate limit. I used 2 other APIs (Alphavantage and Polygon.io) for the search box suggestion feature as well as the stock suggestion feature but at times their 5 call / minute rate plans would leave sections of my app blank. 

I do plan on using the IEX Cloud API again in the future. Possibly on a program that is more backend heavy to perform calculations and possibly do some analysis on historical data. The 100 call / second rate limit should tide me over for a while until I can gain access to CTA feeds. First, I have to design and create an infrastructure that can crunch data at a rate faster than 10 ms, until then an IEX Cloud API subscription should be fine.   -->