import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StockDetail from "./StockDetail";
import PublicWatchlist from "./PublicWatchlist";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "semantic-ui-react";
import {
  updateUser,
  updateStockInfo,
  updateKeyData,
  updateSimilarStock,
  updateBatchSimInfo,
  updateSearch,
  updateBatchWatchlist,
  updateChartData,
  updatePublicList,
  updateTreemap,
  updateNews
} from "./appSlice";
import Search from "./Search.js";
import HeadNav from "./HeadNav";
import Watchlist from "./Watchlist";
import {useHistory} from 'react-router-dom'

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.app.user);
  const searchSymbol = useSelector((state) => state.app.searchSymbol);
  const stockInfo = useSelector((state) => state.app.stockInfo);
  const history = useHistory()

  useEffect(() => {
    // let date = new Date()
    // let currMins = date.getHours()*60 + date.getMinutes()

    // console.log(user.loadwatchlist)

    fetch(`${process.env.REACT_APP_BACKEND_URL}/treemapdata`)
      .then( r => r.json())
      .then( data => {dispatch(updateTreemap(data))
      })

    fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlists/all`)
      .then( r => r.json())
      .then( publicList => dispatch(updatePublicList(publicList)))

    fetch(`${process.env.REACT_APP_BACKEND_URL}/news/${user.watchlists[user.loadwatchlist].arrayList.join(",")}`)
      .then((r) => r.json())
      .then((news) => {
        dispatch(updateNews(news));
      });

      

    fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${user.watchlists[user.loadwatchlist].arrayList.join(",")}`)
      .then((r) => r.json())
      .then((data) => {
        // console.log(data)
        dispatch(updateBatchWatchlist(data));
      });

    // const id = setInterval( () => {

    //   if ( currMins < (9*60+30) && currMins < (23*60) ) {

    //     console.log('2 credit call')

    //     fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${watchlistString}`)
    //     .then( r => r.json())
    //     .then( data => {
    //       console.log(data)
    //       dispatch(updateBatchWatchlist(data))})

    //   }

    // }, 60000)

    // return function cleanup () {
    //   clearInterval(id)
    // }
  }, [dispatch, user.watchlists, user.loadwatchlist]);

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Matt", password: "123" }),
    })
      .then((r) => r.json())
      .then((loginUser) => {
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/batch/${loginUser.watchlists[
            user.loadwatchlist
          ].arrayList.join(",")}`
        )
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            dispatch(updateBatchWatchlist(data));
          });

        dispatch(updateUser(loginUser));
      });
  };

  const handleSearchRequest = (symbol = searchSymbol) => {
    // fetch to the backend using the searchSymbol, on a route to a controller that'll make the api requests, make use of env variables here
    fetch(`${process.env.REACT_APP_BACKEND_URL}/stocks/${symbol}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch(updateStockInfo(data));
      });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/stockdata/${symbol}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch(updateKeyData(data));
      });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/chartdata/${symbol}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch(updateChartData(data));
      });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/similarstock/${symbol}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch(updateSimilarStock(data.similar));
        data.string &&
          fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${data.string}`)
            .then((r) => r.json())
            .then((data) => {
              dispatch(updateBatchSimInfo(data));
            });
      });
    dispatch(updateSearch(""));
  };

  const handleCardClick = () => {
    handleSearchRequest();
    dispatch(updateSearch(""));
  };

  const addToWishlist = () => {
    const wishlistObj = {
      companyName: `${stockInfo.company_name}`,
      symbol: `${stockInfo.symbol}`,
      description: `${stockInfo.description}`,
      sector: `${stockInfo.sector}`,
      industry: `${stockInfo.industry}`,
      employees: `${stockInfo.employees}`,
      ceo: `${stockInfo.ceo}`,
      exchange: `${stockInfo.exchange}`,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/addtowatchlist/${
        user.watchlists[user.loadwatchlist].id
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wishlistObj),
      }
    )
      .then((r) => r.json())
      .then((userRender) => {
        dispatch(updateUser(userRender));

        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/batch/${userRender.watchlists[
            user.loadwatchlist
          ].arrayList.join(",")}`
        )
          .then((r) => r.json())
          .then((data) => {
            dispatch(updateBatchWatchlist(data));
          });
      });
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault()
    
    if(user.name === 'Guest') {

        alert('Please sign in to view your watchlists')

    } else {
    history.push('/watchlist')
    }

  }

  return (
    <div className="App">
      <HeadNav
      handleWatchlistClick={handleWatchlistClick}
      />
      <Search handleSearchRequest={handleSearchRequest} />
      <Switch>
        <Route exact path="/">
          <Container>
            <Dashboard 
            handleLogin={handleLogin} 
            handleWatchlistClick={handleWatchlistClick}
            />
          </Container>
        </Route>
        <Route exact path="/stockdetail">
          <StockDetail
            handleSearchRequest={handleSearchRequest}
            handleCardClick={handleCardClick}
            addToWishlist={addToWishlist}
          />
        </Route>
        <Route exact path="/publicwatchlists">
          <PublicWatchlist />
        </Route>
        <Route exact path="/watchlist">
          <Watchlist />
        </Route>
        <Route path="*">
          <h1 class="error"> Error: 404 NOT FOUND</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
