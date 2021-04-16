import { useState } from "react";
import { Header, Card, Button, Container, Popup } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../appSlice";
import StockCard from './StockCard'

const WatchCard = ({ listName, stocksArray, listID, edit, setEdit, handleEditForm }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const [hover, setHover] = useState(false)
  console.log(hover)
  

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
    const stockComponents = stocksArray.map((symbol) => ( <StockCard stock={symbol} listName={listName}/>
    ));
    return (
      <Card style={{ height: "350px", width: "300px", borderStyle: listName === user.loadwatchlist && 'solid' }}>
        <Popup 
        wide
        trigger={
        <Header 
          as="h1" 
          onMouseEnter={(e)=>setHover(true)} 
          onMouseLeave={()=>setHover(false)}
          onDoubleClick={(e)=>handleEdit(e) } 
          style={{ marginTop: ".25em", 
          marginBottom: "0",
          fontSize: hover ? '32px' : '22px'
           }}>
          {listName}
        </Header>} >
        <Popup.Content style={{textAlign: 'center'}}>
          {`Description: ${user.watchlists[listName].description}`}
        </Popup.Content>
          </Popup>
        <Container
          style={{
            padding: ".5em",
            height: "80%",
            width: "90%",
            marginTop: ".75em",
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
