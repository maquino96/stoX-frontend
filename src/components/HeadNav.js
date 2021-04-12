import React from 'react'
import { Header } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const HeadNav = () => {
    const history = useHistory()

    const handleStoxClick = (e) => {
        e.preventDefault()
        history.push('/')

    }

    return (
        <div>
            <Header as='h1' style={{padding: '1em', textAlign: 'left', backgroundColor: 'blue'}}>
                <Header.Content onClick={(e) => handleStoxClick(e)}> StoX </Header.Content>
            </Header>
        </div>
    )
}

export default HeadNav
