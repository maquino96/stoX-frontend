import React from "react";
import { Grid, Container} from "semantic-ui-react";
import SectorTreemap from "./Dashboard/SectorTreemap";
import WatchlistWidget from "./Dashboard/WatchlistWidget";
import News from './Dashboard/News'

const Dashboard = ({ handleSearchRequest, handleLogin, handleWatchlistClick }) => {
  // let history = useHistory();

  return (
    <div>
      <Container>
      <Grid>

        <Grid.Row>
            <News />
        </Grid.Row>



        <Grid.Row>
        <Grid.Column width={10}>
                <Grid.Row><SectorTreemap/></Grid.Row> 
        </Grid.Column>

        <Grid.Column width={6}>
          <Grid.Row textAlign='right'>
              <WatchlistWidget
              handleWatchlistClick={handleWatchlistClick}/>
          </Grid.Row>
        </Grid.Column>
        </Grid.Row>

      </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
