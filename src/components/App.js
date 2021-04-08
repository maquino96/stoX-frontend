import './App.css';
// import {useEffect} from 'react'
import { Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import StockDetail from './StockDetail'
import Watchlist from './Watchlist'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { updateStockInfo, updateKeyData } from './appSlice'
import Search from './Search.js'
function App() {

  const dispatch = useDispatch()

  // const user = useSelector( state => state.app.user )
  const searchSymbol = useSelector( state => state.app.searchSymbol)
  // const stockInfo = useSelector( state => state.app.stockInfo)

  const handleSearchRequest = () => {
    // debugger
    // fetch to the backend using the searchSymbol, on a route to a controller that'll make the api requests, make use of env variables here
      fetch(`${process.env.REACT_APP_BACKEND_URL}/stocks/${searchSymbol}`)
      .then( r => r.json())
      .then( data => {dispatch(updateStockInfo(data))
      })

      fetch(`${process.env.REACT_APP_BACKEND_URL}/stockdata/${searchSymbol}`)
      .then( r => r.json())
      .then( data => {console.log(data)
      dispatch(updateKeyData(data))})

  }

  return (
    <div className="App">
      We R StoX ba bum bum bummmm
      <Search handleSearchRequest={handleSearchRequest}/>
      <Switch>
        <Route exact path="/">
          <Container>
          <Dashboard />
          </Container>
        </Route>
        <Route exact path='/stockdetail'>
          <StockDetail />
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
