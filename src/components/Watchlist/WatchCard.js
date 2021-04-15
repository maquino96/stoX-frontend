import { useState } from "react";
import { Header, Card, Button, Container } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../appSlice";

const WatchCard = ({ listName, stocksArray, listID, edit, setEdit, handleEditForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const [hover, setHover] = useState(true)

  const handleListDelete = (event) => {
    event.preventDefault();

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deleteList/${listID.toString()}`,
      {
        method: "DELETE",
      }
    )
      .then((r) => r.json())
      .then((renderUser) => {
        dispatch(updateUser(renderUser));
      });
  };

  const handleMain = () => {
    console.log('clicked main')

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...user, loadwatchlist: listName}),
    })
      .then((r) => r.json())
      .then(userRender => { console.log(userRender)
        dispatch(updateUser(userRender))  
      })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setEdit(!edit)
    handleEditForm(listName)

  }

  if (stocksArray) {
    const stockComponents = stocksArray.map((stock) => (
      <Card style={{ width: "90%", marginLeft: "7px" }}>{stock}</Card>
    ));
    return (
      <Card style={{ height: "350px", width: "300px", borderStyle: listName === user.loadwatchlist && 'solid' }}>
        <Header as="h1" onClick={(e)=>handleEdit(e) } style={{ marginTop: ".25em", marginBottom: "0" }}>
          {listName}
        </Header>
        <Container
          style={{
            padding: ".5em",
            height: "80%",
            width: "90%",
            marginTop: "1em",
            marginBottom: "9px",
            marginLeft: "15px",
            overflowY: "scroll",
          }}
        >
          {stockComponents}
        </Container>
        <>
          {listName !== user.loadwatchlist && (
            <Button
              compact
              onClick={(e) => handleListDelete(e)}
              style={{ marginBottom: "5px"}}
            >
              {" "}
              Delete List{" "}
            </Button>
          )}
          {listName !== user.loadwatchlist && (
            <Button compact onClick={(e)=>handleMain(e)} style={{marginBottom: '5px'}}> Make List Main </Button>
          )}
        </>
      </Card>
    );
  } else {
    return <></>;
  }
};

export default WatchCard;
