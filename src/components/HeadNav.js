import React from 'react'
import { Header, Menu } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUser, updateBatchWatchlist } from './appSlice'

const HeadNav = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
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

    const handleStoxClick = (e) => {
        e.preventDefault()
        history.push('/')

    }

    const handleWatchlistCLick = (e) => {
        e.preventDefault()
        history.push('/publicwatchlists')
    }

    return (
        <div>
            <Header as='h1' style={{padding: '1em', paddingBottom: '.5em', backgroundColor: '#34526f'}}>
                <Menu  pointing secondary style={{padding: '0em', fontSize: '.6em'}}>
                <Header.Content onClick={(e) => handleStoxClick(e)} style={{fontSize: '3em', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fontWeight: 700}}> StoX </Header.Content>
                    <Menu.Menu position='right'>
                    <Menu.Item onClick={(e) => handleStoxClick(e)}>Home</Menu.Item> 
                    <Menu.Item onClick={(e)=>handleWatchlistCLick(e)}>Watchlists</Menu.Item>
                    <Menu.Item onClick={(e)=>handleLogout(e)}>Logout</Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Header>
        </div>
    )
}

export default HeadNav
