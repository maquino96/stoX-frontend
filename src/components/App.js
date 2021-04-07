import './App.css';
// import {useEffect} from 'react'
import { Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import StockDetail from './StockDetail'
import Watchlist from './Watchlist'
import { useDispatch, useSelector } from 'react-redux'
import { updateStockInfo } from './appSlice'

function App() {

  const dispatch = useDispatch()
  const user = useSelector( state => state.app.user )
  const searchSymbol = useSelector( state => state.app.searchSymbol)
  const stockInfo = useSelector( state => state.app.stockInfo)
  // const stockInfo = useSelector( state =>state.stockInfo)

  // useEffect(()=>{
  //   console.log(stockInfo)
  // },[stockInfo])

  return (
    <div className="App">
      We R StoX ba bum bum bummmm
      {/* {dispatch(updateUser())} */}
      {/* {dispatch(updateUser('Matty'))} */}
      {/* <button onClick={()=>dispatch( {type: 'app/updateStockInfo', payload: 7})}>Press Me</button> */}
      <button onClick={()=>dispatch(updateStockInfo({name: 'HapBirfDayMax', age: 25}))}>Press Me</button>
      {/* dispatch(updateStockInfo(7)) */}
      {console.log(searchSymbol, user, stockInfo)}
      <Switch>
        <Route exact path="/">
          <Dashboard />
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
