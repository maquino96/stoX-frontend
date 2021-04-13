import React from 'react'
import {Segment, Header, Card, Button, Container} from 'semantic-ui-react'
import { useSelector, useDispatch} from 'react-redux'
import {updateUser } from '../appSlice'

const WatchCard = ({listName, stocksArray, listID}) => {
    const dispatch = useDispatch()
    const user = useSelector( state => state.app.user)
    const onLoadWatchlist = useSelector( state => state.app.onLoadWatchlist )

    console.log(listID)


    const handleListDelete = (event) => {
        event.preventDefault()

        fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteList/${listID.toString()}`, {
            method: 'DELETE'
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({})
          })
          .then( r => r.json())
          .then( renderUser => {
              console.log(renderUser)
              dispatch(updateUser(renderUser))})

    }



    if (stocksArray) {
    const stockComponents = stocksArray.map( stock => <Card style={{width: '90%', marginLeft: '7px'}}>{stock}</Card>)
    return (
            <Card style={{height: '350px', width: '300px'}}>
                <Header as='h1' style={{marginTop: '.25em', marginBottom: '0'}}>{listName}</Header>
                <Container style={{padding: '.5em', height: '80%', width: '90%', marginTop: '1em', marginBottom: '9px', marginLeft: '15px', overflowY: 'scroll'}}>
                {stockComponents}
                </Container>
                <>
                    { listName !== 'default' && <Button compact onClick={(e)=>handleListDelete(e)} style={{marginBottom: '8px'}}> Delete List </Button>}
                    { listName !== onLoadWatchlist &&<Button compact> Make List Main </Button> }
                </>
            </Card>
    )
    } else {
        return (<></>)
    }
}

export default WatchCard
