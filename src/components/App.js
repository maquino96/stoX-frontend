import './App.css';
import {useEffect} from 'react'
import { Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import StockDetail from './StockDetail'
import PublicWatchlist from './PublicWatchlist'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { 
  updateUser, 
  updateStockInfo, 
  updateKeyData, 
  updateSimilarStock, 
  updateBatchSimInfo, 
  updateSearch, 
  updateBatchWatchlist,
  updateChartData } from './appSlice'
import Search from './Search.js'
import HeadNav from './HeadNav';
import Watchlist from './Watchlist';
function App() {

  const dispatch = useDispatch()

  const user = useSelector( state => state.app.user )
  const searchSymbol = useSelector( state => state.app.searchSymbol)
  const stockInfo = useSelector( state => state.app.stockInfo )

  const onLoadWatchlist = useSelector (state => state.app.onLoadWatchlist)
  // const watchlistArray = useSelector( state => state.app.user.watchlists[onLoadWatchlist])
  // let watchlistString = watchlistArray.arrayList.join(',')
  // console.log(user.watchlists[onLoadWatchlist].arrayList.join(','))
  // const stockInfo = useSelector( state => state.app.stockInfo)

  // console.log(watchlistArray)
  // console.log(watchlistString)


  useEffect(()=>{

    let date = new Date()
    let currMins = date.getHours()*60 + date.getMinutes()
    // let watchlistString = watchlistArray.join(',')
    // console.log(watchlistString)
    
    // let watchlistString = 

    fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${user.watchlists.default.arrayList.join(',')}`)
    .then( r => r.json())
    .then( data => {
      // console.log(data)
      dispatch(updateBatchWatchlist(data))})

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


  }, [] )

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name: 'Matt', password: '123'}),
    })
      .then((r) => r.json())
      .then((loginUser) => {

      fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${loginUser.watchlists.default.arrayList.join(',')}`)
      .then( r => r.json())
      .then( data => {
        console.log(data)
        dispatch(updateBatchWatchlist(data))
        
      })

      
        dispatch(updateUser(loginUser))
      })

      // watchlistString is not being updated

    // fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${user.watchlists.default.join(',')}`)
    //   .then( r => r.json())
    //   .then( data => {
    //     console.log(data)
    //     dispatch(updateBatchWatchlist(data))
        
    //   })
    
  }

  const handleSearchRequest = (symbol=searchSymbol) => {
    // debugger
    // fetch to the backend using the searchSymbol, on a route to a controller that'll make the api requests, make use of env variables here
      fetch(`${process.env.REACT_APP_BACKEND_URL}/stocks/${symbol}`)
      .then( r => r.json())
      .then( data => {dispatch(updateStockInfo(data))
      })

      fetch(`${process.env.REACT_APP_BACKEND_URL}/stockdata/${symbol}`)
      .then( r => r.json())
      .then( data => {dispatch(updateKeyData(data))})

      fetch(`${process.env.REACT_APP_BACKEND_URL}/chartdata/${symbol}`)
      .then( r => r.json())
      .then( data => { console.log(data)
        dispatch(updateChartData(data))
      })

      fetch(`${process.env.REACT_APP_BACKEND_URL}/similarstock/${symbol}`)
      .then( r => r.json())
      .then( data => {
        // console.log(data)
        dispatch(updateSimilarStock(data.similar))
        data.string &&
        (fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${data.string}`)
        .then( r => r.json())
        .then( data => {dispatch(updateBatchSimInfo(data))}
        )) 
      })
      dispatch(updateSearch(''))

      

  }

  const handleCardClick = () => {

    handleSearchRequest()
    dispatch(updateSearch(''))

  }

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
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/addtowatchlist/${user.watchlists[onLoadWatchlist].id}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wishlistObj)
    })
    .then( r => r.json())
    .then( userRender => {

      console.log(userRender)
      dispatch(updateUser(userRender))

      fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${userRender.watchlists[onLoadWatchlist].arrayList.join(',')}`)
      .then( r => r.json())
      .then( data => {
        console.log(data)
        dispatch(updateBatchWatchlist(data))
        
      })})

    // console.log(wishlistObj)


  }

  return (
    <div className="App">
      <HeadNav/>
      <Search handleSearchRequest={handleSearchRequest}/>
      <Switch>
        <Route exact path="/">
          <Container>
          <Dashboard handleLogin={handleLogin} />
          </Container>
        </Route>
        <Route exact path='/stockdetail'>
          <StockDetail 
          handleSearchRequest={handleSearchRequest} 
          handleCardClick={handleCardClick}
          addToWishlist={addToWishlist}/>
        </Route>
        <Route exact path='/publicwatchlists'>
          <PublicWatchlist />
        </Route>
        <Route exact path='/watchlist'>
          <Watchlist/>
        </Route>
        <Route path='*'>
          <h1 class='error'> Error: 404 NOT FOUND</h1>
        </Route>

      </Switch>

    </div>
  );
}

export default App;
