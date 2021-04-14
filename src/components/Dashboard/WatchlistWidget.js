import { React} from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import WatchlistCard from './WatchlistCard'
import {useHistory} from 'react-router-dom'
const WatchlistWidget = () => {

    const user = useSelector( state => state.app.user)
    const history = useHistory() 

    const handleWatchlistClick = (e) => {
        e.preventDefault()
        
        if(user.name === 'Guest') {

            alert('Please sign in to view your watchlists')

        } else {
        history.push('/watchlist')
        }

    }


    const watchlistCards = user.watchlists[user.loadwatchlist].arrayList.map( stock => <WatchlistCard key={stock} stock={stock}/>)

    return (
        <div style={{padding: '1em', borderStyle: 'solid', textAlign: 'center'}}>
            <Container style={{textAlign: 'center'}}>
                <Grid.Row >
                    <Header onClick={(e) => handleWatchlistClick(e)} style={{fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fontSize: '20px', fontWeight: '700'}}>Watchlist ({user.loadwatchlist})</Header>
                </Grid.Row>
                <Grid.Row>
                    {watchlistCards}
                </Grid.Row>
            </Container>         
        </div>
    )
}

export default WatchlistWidget
