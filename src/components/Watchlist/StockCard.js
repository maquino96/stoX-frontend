import {useState} from 'react'
import {Card, Icon } from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import { updateUser } from '../appSlice'

const StockCard = ({stock, listName}) => {
    const [hover, setHover] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.app.user)

    const handleStockDelete = (event) => {
        event.preventDefault()

        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/watchstock/${user.watchlists[listName].id}/${stock}`,
            {
              method: "DELETE",
            }
          )
            .then((r) => r.json())
            .then((renderUser) => {
              dispatch(updateUser(renderUser));
            });
    }

    if(stock){

    return (
        <>
        <Card.Group>
        <Card style={{ width: "82%", marginLeft: "9px", marginRight: '5px', marginTop: '7px', marginBottom: '7px', height: '2em' }}><div style={{marginTop: '5px'}}>{stock}</div></Card>
        <Icon onClick={(e)=>handleStockDelete(e)} onMouseEnter={(e)=>setHover(true)} onMouseLeave={()=>setHover(false)} name='close' size='large' style={{marginTop: '11px'}} color={hover && 'red'}/>
        </Card.Group>   
        </>
    )
    } else {
        return( <></>)
    }
}

export default StockCard
