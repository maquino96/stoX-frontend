import React from "react";
import { Grid, Container} from "semantic-ui-react";
import UserInfo from "./Dashboard/UserInfo";
import WatchlistWidget from "./Dashboard/WatchlistWidget";
// import {useHistory} from "react-router-dom"

const Dashboard = ({ handleSearchRequest, handleLogin }) => {
  // let history = useHistory();

  return (
    <div>
      <Container>
      <Grid textAlign='center'>
        <Grid.Column width={10}>
                <Grid.Row>News</Grid.Row>
                <Grid.Row>Sector Treemap</Grid.Row> 
        </Grid.Column>

        <Grid.Column width={6}>
          <Grid.Row>
              <UserInfo handleLogin={handleLogin}/>
          </Grid.Row>
          <Grid.Row>
              <WatchlistWidget/>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
