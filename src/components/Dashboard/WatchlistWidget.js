import { React} from 'react'
import { Card, Container, Grid, Header } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import WatchlistCard from './WatchlistCard'
// import {useHistory} from 'react-router-dom'
const WatchlistWidget = ({handleWatchlistClick, handleSearchRequest}) => {

    const user = useSelector( state => state.app.user)
    // const history = useHistory() 


    const watchlistCards = user.watchlists[user.loadwatchlist].arrayList.map( stock => <WatchlistCard key={stock} stock={stock} handleSearchRequest={handleSearchRequest}/>)

    return (
        <div className='widgetdiv' style={{textAlign: 'center', opacity: '.95'}}>
            <Card style={{textAlign: 'center', width: '100%', height: '110%'}}>
                <Grid.Row >
                    <Header onClick={(e) => handleWatchlistClick(e)} style={{paddingTop: '.75em', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fontSize: '20px', fontWeight: '700'}}>Watchlist ({user.loadwatchlist})</Header>
                </Grid.Row>
                <Grid.Row>
                    <Container style={{overflowY: 'scroll', height: '35em'}}>
                    {watchlistCards}
                    </Container>
                </Grid.Row>
            </Card>         
        </div>
    )
}

export default WatchlistWidget
