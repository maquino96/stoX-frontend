import React from 'react'
import { Card, Container, Icon, Popup } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { updateUser, updatePublicList } from '../appSlice'
import { useSelector } from 'react-redux'

const PublicCard = ({listObj, setClickedObj, clickedObj}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.app.user)
    // console.log(listObj)

    const handleIconClick = (e) => {
        e.preventDefault()

        if (user.name === 'Guest'){ alert('Please sign in to upvote list')}
        else {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlist/upvote/${listObj.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          })
            .then((r) => r.json())
            .then(userRender => { 
              dispatch(updateUser(userRender)) 
            })

        fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlists/all`)
            .then( r => r.json())
            .then( publicList => dispatch(updatePublicList(publicList)))
        }
    }

    return (
        <Popup 
        basic
        content={listObj.description} 
        wide='very'
        trigger={
        <Card style={{height: '7.31em', color: 'black', borderStyle: ''}}>
            <Card.Header as='h3' onClick={()=>setClickedObj(listObj)} style={{marginBottom: '0', marginTop: '1em'}}>{listObj.name} </Card.Header>
            <Card.Meta onClick={()=>setClickedObj(listObj)}>Created by: {listObj.user}</Card.Meta>
            {/* <Container onClick={()=>setClickedObj(listObj)} style={{overflowY:'scroll', height: '5.5em', textAlign: 'left', paddingLeft: '10px', paddingRight: '10px'}}>
                {listObj.description}
            </Container> */}
            <div style={{ padding: '.35em', fontSize: '20px'}}>
                {listObj.upvotes} 
                <Icon onClick={(e)=>handleIconClick(e)} style={{paddingLeft: '.55em'}} name='arrow alternate circle up outline'/>
            </div>
        </Card>
        } />
    
    )
}

export default PublicCard
