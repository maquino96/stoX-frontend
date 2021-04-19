import React from "react";
import { Grid, Container} from "semantic-ui-react";
import SectorTreemap from "./Dashboard/SectorTreemap";
import WatchlistWidget from "./Dashboard/WatchlistWidget";
// import {useHistory} from "react-router-dom"
import LoginContainer from './LoginContainer'

const Dashboard = ({ handleSearchRequest, handleLogin, handleWatchlistClick }) => {
  // let history = useHistory();

  return (
    <div>
      <Container>
      <Grid>
        <Grid.Column width={10}>
                <Grid.Row>News</Grid.Row>
                <Grid.Row><SectorTreemap/></Grid.Row> 
        </Grid.Column>

        <Grid.Column width={6}>
          <Grid.Row>
              {/* <UserInfo handleLogin={handleLogin}/> */}
              <LoginContainer/>
          </Grid.Row>
          <Grid.Row textAlign='right'>
              <WatchlistWidget
              handleWatchlistClick={handleWatchlistClick}/>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
