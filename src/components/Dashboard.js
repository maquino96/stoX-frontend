import React from "react";
import { Grid, Container, Header} from "semantic-ui-react";
import SectorTreemap from "./Dashboard/SectorTreemap";
import WatchlistWidget from "./Dashboard/WatchlistWidget";
import News from './Dashboard/News'

const Dashboard = ({ handleSearchRequest, handleLogin, handleWatchlistClick }) => {
  // let history = useHistory();

  return (
    <div style={{paddingBottom: '3em'}}>
      <Container>
      <Grid>

        <Grid.Row>
        <Header style={{marginTop: '.5em', marginBottom: '.5em', paddingLeft: '2em', fontSize: '28px', color: 'white'}}> Daily News </Header>

            <News />
        </Grid.Row>

        <Grid.Row>
        <Grid.Column width={10}>
                <Grid.Row><SectorTreemap/></Grid.Row> 
        </Grid.Column>

        <Grid.Column width={6}>
          <Grid.Row textAlign='right'>
              <WatchlistWidget
              handleWatchlistClick={handleWatchlistClick}
              handleSearchRequest={handleSearchRequest}/>
          </Grid.Row>
        </Grid.Column>
        </Grid.Row>

      </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
