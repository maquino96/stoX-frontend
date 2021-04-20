import { useState } from "react";
import { Checkbox, Search, Container, Grid, Card, Segment, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import PublicCard from "./PublicWatchlist/PublicCard";
// import { useHistory } from "react-router-dom"

const PublicWatchlist = () => {
  // let history = useHistory();
  const [searchTerm, setSearchTerm] = useState('')
  const [clickedObj, setClickedObj] = useState(null);
  const [sort, setSort] = useState(true)
  console.log(sort)

  const publicList = useSelector((state) => state.app.publicList);

  // console.log( publicList[0].createdAt)
  // console.log(publicList);

  const filteredArray = publicList.filter( list => list.name.toLowerCase().includes(searchTerm.toLowerCase()))
  // console.log(filteredArray)

  const byMostRecent = filteredArray
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((list) => (
      <PublicCard
        clickedObj={clickedObj}
        setClickedObj={setClickedObj}
        key={list.id}
        listObj={list}
      />
    ));

  const byMostUpvotes = filteredArray
    .slice()
    .sort((a, b) => b.upvotes - a.upvotes)
    .map((list) => (
      <PublicCard
        clickedObj={clickedObj}
        setClickedObj={setClickedObj}
        key={list.id}
        listObj={list}
      />
    ));


  return (
    <div style={{ padding: "1em", maxHeight: "50em" }}>
      <Container style={{}}>
        <Grid>
          <Grid.Column width={11} style={{paddingTop: '14px'}}>
            <Card.Group
              itemsPerRow={2}
              style={{ overflowY: "scroll", maxHeight: "53.5em"}}
            >
              {sort ?  byMostRecent : byMostUpvotes }
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={5} style={{paddingTop: '.5em'}}>
            <Grid.Row>
              <Segment
                raised
                style={{
                  marginBottom: "3em",
                  height: "9em",
                  borderWidth: "5px",
                  borderColor: "black",
                }}
              >
                <Search
                  showNoResults={false}
                  value={searchTerm}
                  onSearchChange={(e)=>setSearchTerm(e.target.value)}/>
                  <div><label> Most Recent </label><Checkbox toggle onChange={()=>setSort(!sort) } style={{paddingTop: '1em', marginLeft: '1em', marginRight: '1em'}}/> <label> Most Upvotes </label> </div>
              </Segment>

              {clickedObj ? (
                <Segment
                  raised
                  style={{
                    marginTop: "2em",
                    borderWidth: "5px",
                    borderColor: "black",
                    height: "41.5em",
                    // overflowY: "scroll",
                  }}
                >
                  <Header style={{ marginBottom: "0px" }}>
                    {clickedObj.name}
                  </Header>
                  <Header.Subheader>
                      By: {clickedObj.user} ||
                    {" "}
                    Count: {clickedObj.arrayList.length} || Votes:{" "} {clickedObj.upvotes}
                  </Header.Subheader>
                  <Segment style={{height: '24em', overflowY: 'scroll', marginTop: '7px', paddingTop: '7px', marginBottom: '7px' }}>
                  {clickedObj.arrayList.map((stock) => (
                    <Card
                      style={{
                        marginTop: "10px",
                        marginBottom: "5px",
                        height: "3em",
                      }}
                    >
                      <div style={{ marginTop: ".6em", fontSize: "20px" }}>
                        {stock}{" "}
                      </div>
                    </Card>
                  ))}
                  </Segment>
                  <div style={{fontWeight: 'bold'}}>Description:</div>
                  <Container style={{ padding: '.25em', paddingTop: '.5em',height: "10em", textAlign: "left", overflowY: 'scroll' }}>
                    {clickedObj.description}
                  </Container>
                </Segment>
              ) : (
                <Segment>
                  <Header> Click on a list for more info </Header>
                </Segment>
              )}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default PublicWatchlist;
