import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import WatchCard from "./Watchlist/WatchCard";
import { Container, Card } from "semantic-ui-react";
import NewListForm from "./Watchlist/NewListForm";
import {updateUser} from './appSlice'
import EditForm from "./Watchlist/EditForm";

const Watchlist = ({handleSearchRequest}) => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.app.user);
  const [edit, setEdit ] = useState(false)
  const [listClicked, setListClicked] = useState('')

  const [formData, setFormData] = useState({
    user_id: user.id,
    name: "",
    public: true,
    description: "",
  });

  const handleEditForm = (list) => {
    setListClicked(list)

    !edit ? 
    (setFormData({
      user_id: user.id,
      name: list,
      public: user.watchlists[list].public,
      description: user.watchlists[list].description,
    }))
    : 
    (setFormData({
      user_id: user.id,
      name: "",
      public: true,
      description: "",
    }))

  }

  const watchlistCards = () => {
    let headersArray = [];
    for (const list in user.watchlists) {
      headersArray.push(
        <WatchCard
          listName={list}
          stocksArray={user.watchlists[list].arrayList}
          listID={user.watchlists[list].id}
          edit={edit}
          setEdit={setEdit}
          handleEditForm={handleEditForm}
          handleSearchRequest={handleSearchRequest}
        />
      );
    }
    return headersArray;
  };

  const updateForm = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setFormData({ ...formData, public: !formData.public });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/newlist/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((userRender) => {
        dispatch(updateUser(userRender));
      });

    setFormData({
      user_id: user.id,
      name: "",
      public: true,
      description: "",
    });
  };

  const handleUpdate =(e) => {
    e.preventDefault()

    listClicked === user.loadwatchlist &&
    (alert('Please change main list prior to updating list'))

    // my sad attempt at trying to patch user.loadwatchlist so that list name could be editted simultaneously

    // (
    // fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({...user, loadwatchlist: formData.name}),
    // })
    //   .then((r) => r.json())
    //   .then(userRender => { console.log(userRender)
    //     dispatch(updateUser(userRender))  
    //   })
    // )

    fetch(`${process.env.REACT_APP_BACKEND_URL}/watchlists/${user.watchlists[listClicked].id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then(userRender => { 
        dispatch(updateUser(userRender))  
      })

    alert('List updated')
    
  }

  return (
    <Container>
      <h1 style={{paddingTop: '.5em'}}>Personal Watchlists</h1>
      <Container
        style={{ overflowY: "scroll", maxHeight: "28.5em", padding: "1em" }}
      >
        <Card.Group
          itemsPerRow={3}
          textAlign={"center"}
          style={{ marginLeft: "1.5em", padding: "1em" }}
        >
          {watchlistCards()}
        </Card.Group>
      </Container>
      {!edit ?
      <NewListForm
        edit={edit}
        setEdit={setEdit}
        formData={formData}
        setFormData={setFormData}
        updateForm={updateForm}
        handleCheck={handleCheck}
        handleSubmit={handleSubmit}
      />
      :
      <EditForm
        edit={edit}
        setEdit={setEdit}
        formData={formData}
        setFormData={setFormData}
        updateForm={updateForm}
        handleCheck={handleCheck}
        handleUpdate={handleUpdate}/>
      }
      
    </Container>
  );
};

export default Watchlist;
