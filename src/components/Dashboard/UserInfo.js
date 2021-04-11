import React from 'react'
import { Button, Container } from 'semantic-ui-react'

const UserInfo = ({handleLogin}) => {

    
    return (
        <div style={{padding: '1em', borderStyle: 'solid'}}>
            <Container>
              <Button onClick={ (e) => handleLogin(e) }> Login </Button>
              <Button> Sign Up </Button>
            </Container> 
        </div>
    )
}

export default UserInfo
