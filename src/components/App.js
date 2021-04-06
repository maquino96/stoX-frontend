import './App.css';
import { Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import StockDetail from './StockDetail'
import Watchlist from './Watchlist'

function App() {
  return (
    <div className="App">
    We R StoX ba bum bum bummmm
    <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path='/stockdetail'>
          <StockDetail/>
        </Route>
        <Route exact path='watchlist'>
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
