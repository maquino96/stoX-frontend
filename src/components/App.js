import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StockDetail from "./StockDetail";
import PublicWatchlist from "./PublicWatchlist";
import { useDispatch, useSelector } from "react-redux";
import { Container, Header, Icon } from "semantic-ui-react";
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
  updateNews,
  updateCandleData,
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
        dispatch(updateBatchWatchlist(data));
      });

    // const id = setInterval( () => {

    //   if ( currMins > (570) && currMins < (960) ) {

    //     fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${user.watchlists[user.loadwatchlist].arrayList.join(",")}`)
    //     .then( r => r.json())
    //     .then( data => { console.log('PAGE-RELOADED',data)
    //       dispatch(updateBatchWatchlist(data))})
    //   }
    // }, 10000)

    // return function cleanup () {
    //   clearInterval(id)
    // }

  }, [dispatch, user.watchlists, user.loadwatchlist]);

  const handleError = (response) => {


    if (!response.ok) {
      // Should be throwing the error and making use of catch but with the conitional originally built in if(data.symbol) the code is working in the way I intended.
      // throw Error(response.statusText)
      // console.log(response.statusText)
    }
    return response;

  }

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
      // .then((r) => r.json())
      .then(handleError)
      .then((data) => { 
        // console.log(typeof data, data)
        if (data.symbol ){
        dispatch(updateStockInfo(data)) 

        fetch(`${process.env.REACT_APP_BACKEND_URL}/stockdata/${symbol}`)
        .then((r) => r.json())
        .then((data) => {
          dispatch(updateKeyData(data));
        });
  
      fetch(`${process.env.REACT_APP_BACKEND_URL}/chartdata/${symbol}`)
        .then((r) => r.json())
        .then((data) => {
          dispatch(updateChartData(data.line))
          dispatch(updateCandleData(data.candle))
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

        history.push('/stockdetail')

        } else { 
          history.push('/')
          fetch(`${process.env.REACT_APP_BACKEND_URL}/alt/${symbol}`)
          .then((r) => r.json())
          .then((data) => { 
            
            // console.log(data)
            alert(`Please try one of the followings symbols: ${data}`)

          })

           }
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
  
  const gitClick = (e) => {
    e.preventDefault()
    window.open('https://github.com/maquino96/ApartmentHunter-frontend', "_blank")

  }

  return (
    <>
    <div className="App" style={{height: '125%'}}>
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
            handleSearchRequest={handleSearchRequest}
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
          <Watchlist handleSearchRequest={handleSearchRequest}/>
        </Route>
        <Route path="*">
          <h1 class="error"> Error: 404 NOT FOUND</h1>
        </Route>
      </Switch>
      </div>
      {/* <Divider style={{marginTop: '3em', marginBottom: '0'}}/> */}
      <Header style={{height: '100%', textAlign: 'left', marginTop:'0em', backgroundColor: 'black'}}>
        <div onClick={(e)=>gitClick(e)} style={{paddingTop: '.75em', paddingBottom: '1em', backgroundColor: 'black'}}>
        <Icon name='github' inverted style={{paddingLeft: '1em', paddingTop: '.25em'}}/> 
        <Header.Content style={{paddingLeft: '2em', paddingTop: '.5em', fontSize: '10px', color: 'white'}}> Matt Aquino</Header.Content>
        </div>
        </Header>
    </>
  );
}

export default App;
