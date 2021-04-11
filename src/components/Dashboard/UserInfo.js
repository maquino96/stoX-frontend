import React from "react";
import { Button, Container } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../appSlice'

const UserInfo = ({ handleLogin }) => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.app.user);

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(updateUser(
        {
        name: 'Guest',
        id: 1,
        watchlists: { default: ['SPY', 'DIA']} 
    }
    ))
  }


    return (
      <div style={{ padding: "1em", borderStyle: "solid" }}>
        <Container>
          {user.name !== "Guest" ? (
            <Button onClick={ (e) => handleLogout(e)}>Logout</Button>
          ) : (
            <>
              <Button onClick={(e) => handleLogin(e)}> Login </Button>
              <Button> Sign up </Button>
            </>
          )}
        </Container>
      </div>
    );
  }

export default UserInfo;
