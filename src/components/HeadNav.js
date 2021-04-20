import {useState} from 'react'
import { Header, Menu, Modal } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, updateBatchWatchlist } from './appSlice'
import LoginContainer from './LoginContainer'

const HeadNav = ({handleWatchlistClick}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.app.user)
    const [open, setOpen] = useState(false)

    const handleLogout = (e) => {
        e.preventDefault()

        if (user.name === 'Guest') {

            alert('No user found. Please login to continue.')
        } else {
        const defaultUser = {
          name: 'Guest',
          id: 1,
          loadwatchlist: 'Default',
          watchlists: { Default: {id: 999,
              arrayList: ['SPY', 'DIA']}
          } 
        }
    
        dispatch(updateUser( defaultUser))
    
        fetch(`${process.env.REACT_APP_BACKEND_URL}/batch/${defaultUser.watchlists[defaultUser.loadwatchlist].arrayList.join(',')}`)
              .then( r => r.json())
              .then( data => {
                dispatch(updateBatchWatchlist(data))
              })
        history.push('/')
      }
    }

    const handleStoxClick = (e) => {
        e.preventDefault()
        history.push('/')

    }

    const handlePubliclistCLick = (e) => {
        e.preventDefault()
        history.push('/publicwatchlists')
    }

    return (
        <div>
            <Header as='h1' style={{padding: '1em', paddingBottom: '.5em', backgroundColor: '#34526f'}}>
            <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            // onOpen={() => setOpen(true)}
            // trigger={<Menu.Item>Logout</Menu.Item>}
            >
                <LoginContainer setOpen={setOpen}/>
            </Modal>
                <Menu  pointing secondary style={{padding: '0em', fontSize: '.6em'}}>
                <Header.Content onClick={(e) => handleStoxClick(e)} style={{fontSize: '3em', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fontWeight: 700}}> StoX </Header.Content>
                    <Menu.Menu position='right'>
                    <Menu.Item onClick={(e) => handleStoxClick(e)}>Home</Menu.Item> 
                    <Menu.Item onClick={(e)=>handleWatchlistClick(e)}> My Lists </Menu.Item>
                    <Menu.Item onClick={(e)=>handlePubliclistCLick(e)}>Forum</Menu.Item>
                    { user.name === 'Guest' ? <Menu.Item onClick={()=>setOpen(true)}>Login</Menu.Item> : 
                    <Menu.Item onClick={(e)=>handleLogout(e)}>Logout</Menu.Item> }
                    
                    </Menu.Menu>
                </Menu>
            </Header>
        </div>
    )
}

export default HeadNav
