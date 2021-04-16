import {useState} from 'react'
import { Card, Icon, Popup } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../appSlice'
import { useSelector } from 'react-redux'

const PublicCard = ({listObj, setClickedObj, clickedObj}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.app.user)
    const [upvotes, setUpvotes ] = useState(listObj.upvotes)
    // console.log(listObj)

    const handleIconClick = (e) => {
        e.preventDefault()

        // I made an explicit choice to optimistically render. Upon scaling up or an increase in the amount of 
        // watchlists there maybe a lag in rendering of likes if it was pessimistically rendered. 
        

        if (user.name === 'Guest'){ alert('Please sign in to upvote list')}
        else {
        setUpvotes(upvotes+1)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlist/upvote/${listObj.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          })
            .then((r) => r.json())
            .then(userRender => { 
              dispatch(updateUser(userRender)) 
            })}

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
                {upvotes} 
                <Icon onClick={(e)=>handleIconClick(e)} style={{paddingLeft: '.55em'}} name='arrow alternate circle up outline'/>
            </div>
        </Card>
        } />
    
    )
}

export default PublicCard
