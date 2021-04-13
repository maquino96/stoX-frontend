import React from 'react'
import {useSelector} from 'react-redux'
import WatchCard from './Watchlist/WatchCard'
import {Container, Card } from 'semantic-ui-react'
import NewListForm from './Watchlist/NewListForm'

const Watchlist = () => {

    const user = useSelector( state => state.app.user)

    const watchlistCards = () => {

        let headersArray = [] 

        for(const list in user.watchlists) { console.log(typeof list, user.watchlists.list)
            headersArray.push(<WatchCard listName={list} stocksArray={user.watchlists[list].arrayList} listID={user.watchlists[list].id}/>)
        }

        return headersArray
    }

    return (
        <Container>
            Personal Watchlists TEST
            <Container style={{overflowY: 'scroll', maxHeight: '29em', padding: '2em'}}>
                <Card.Group itemsPerRow={3} textAlign={'center'} style={{marginLeft: '1.5em', padding: '1em'}}>
                    {watchlistCards()}
                </Card.Group>
            </Container>
            <NewListForm/>
        </Container>
    )
}

export default Watchlist
