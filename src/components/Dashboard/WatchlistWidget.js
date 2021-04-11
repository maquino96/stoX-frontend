import {useEffect, React} from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import WatchlistCard from './WatchlistCard'
const WatchlistWidget = () => {

    const dispatch = useDispatch()

    const onLoadWatchlist = useSelector (state => state.app.onLoadWatchlist)
    // console.log(onLoadWatchlist)
    const watchlistArray = useSelector( state => state.app.user.watchlists[onLoadWatchlist])
    // console.log(wishlistInfo)

    // useEffect(()=>{

    //     dispatch(updateBatchWatchlist())

    // },[onLoadWatchlist]) 






    const watchlistCards = watchlistArray.map( stock => <WatchlistCard key={stock} stock={stock}/>)

    return (
        <div style={{padding: '1em', borderStyle: 'solid'}}>
            <Container style={{padding: '1em'}} >
                <Grid.Row >
                    Watchlist Title
                </Grid.Row>
                <Grid.Row>
                    {watchlistCards}
                </Grid.Row>
            </Container>         
        </div>
    )
}

export default WatchlistWidget
