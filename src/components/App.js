import './App.css';
import {useEffect} from 'react'
import { Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import StockDetail from './StockDetail'
import Watchlist from './Watchlist'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { updateUser, updateStockInfo, updateKeyData, updateSimilarStock, updateBatchSimInfo, updateSearch, updateBatchWatchlist } from './appSlice'
import Search from './Search.js'
function App() {

  const dispatch = useDispatch()

  const user = useSelector( state => state.app.user )
  const searchSymbol = useSelector( state => state.app.searchSymbol)
  const stockInfo = useSelector( state => state.app.stockInfo )

  const onLoadWatchlist = useSelector (state => state.app.onLoadWatchlist)
  const watchlistArray = useSelector( state => state.app.user.watchlists[onLoadWatchlist])
  const watchlistString = watchlistArray.join(',')
  // const stockInfo = useSelector( state => state.app.stockInfo)
  console.log(watchlistArray)


  useEffect(()=>{

    let date = new Date()
    let currMins = date.getHours()*60 + date.getMinutes()
    let watchlistString = watchlistArray.join(',')
    // console.log(watchlistString)
    
    // let watchlistString = 

    fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${watchlistString}`)
    .then( r => r.json())
    .then( data => {
      console.log(data)
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


  }, [user] )

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name: 'Matt', password: '123'}),
    })
      .then((r) => r.json())
      .then((user) => {
        console.log(user)
        dispatch(updateUser(user))
      })

    fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${watchlistString}`)
      .then( r => r.json())
      .then( data => {
        console.log(data)
        dispatch(updateBatchWatchlist(data))})
    
  }

  const handleSearchRequest = () => {
    // debugger
    // fetch to the backend using the searchSymbol, on a route to a controller that'll make the api requests, make use of env variables here
      fetch(`${process.env.REACT_APP_BACKEND_URL}/stocks/${searchSymbol}`)
      .then( r => r.json())
      .then( data => {dispatch(updateStockInfo(data))
      })

      fetch(`${process.env.REACT_APP_BACKEND_URL}/stockdata/${searchSymbol}`)
      .then( r => r.json())
      .then( data => {dispatch(updateKeyData(data))})

      fetch(`${process.env.REACT_APP_BACKEND_URL}/similarstock/${searchSymbol}`)
      .then( r => r.json())
      .then( data => {
        console.log(data)
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

    fetch(`${process.env.REACT_APP_BACKEND_URL}/addtowatchlist/${user.watchlists.currList}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wishlistObj)
    })
    .then( r => r.json())
    .then( addedObj => console.log(addedObj))

    // console.log(wishlistObj)


  }

  return (
    <div className="App">
      We R StoX ba bum bum bummmm
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
        <Route exact path='watchlist'>
          <Watchlist />
        </Route>
        <Route path='*'>
          <h1 class='error'> Error: 404 NOT FOUND</h1>
        </Route>

      </Switch>

    </div>
  );
}

export default App;
