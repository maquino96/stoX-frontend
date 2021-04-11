import React from 'react'
import { Button } from 'semantic-ui-react'

const UserInfo = ({handleLogin}) => {
    return (
        <div>
            <Button onClick={ (e) => handleLogin(e) }> Login </Button>
        </div>
    )
}

export default UserInfo
