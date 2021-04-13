import {useEffect, React} from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import WatchlistCard from './WatchlistCard'
import {useHistory} from 'react-router-dom'
const WatchlistWidget = () => {

    const history = useHistory() 
    const dispatch = useDispatch()
    const user = useSelector( state => state.app.user)

    const onLoadWatchlist = useSelector (state => state.app.onLoadWatchlist)
    // console.log(onLoadWatchlist)
    const watchlistArray = useSelector( state => state.app.user.watchlists[onLoadWatchlist].arrayList)
    // console.log(wishlistInfo)

    // useEffect(()=>{

    //     dispatch(updateBatchWatchlist())

    // },[onLoadWatchlist]) 

    const handleWatchlistClick = (e) => {
        e.preventDefault()
        
        // if(user.name === 'Guest') {

        //     alert('Please sign in to view your watchlists')

        // } else {
        // history.push('/watchlist')
        // }

        history.push('/watchlist')
    }



    const watchlistCards = watchlistArray.map( stock => <WatchlistCard key={stock} stock={stock}/>)

    return (
        <div style={{padding: '1em', borderStyle: 'solid', textAlign: 'center'}}>
            <Container style={{textAlign: 'center'}}>
                <Grid.Row >
                    <Header onClick={(e) => handleWatchlistClick(e)} style={{paddingBottom: '.5em', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fontSize: '20px', fontWeight: '700'}}>Watchlist ({onLoadWatchlist})</Header>
                </Grid.Row>
                <Grid.Row>
                    {watchlistCards}
                </Grid.Row>
            </Container>         
        </div>
    )
}

export default WatchlistWidget
