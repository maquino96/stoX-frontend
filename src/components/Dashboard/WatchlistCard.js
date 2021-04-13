import React from "react";
import { Card, Icon, Dimmer, Loader, Segment, Grid } from "semantic-ui-react";
import { useSelector } from "react-redux";

const WatchlistCard = ({ stock }) => {
  const stockList = useSelector((state) => state.app.batchWatchlist[stock]);
  //   console.log(stock)

  if (stockList) {
    return (
      <div style={{ paddingLeft: "3em" }}>
        <Card>
          <Card.Content>
            <Grid textAlign="center">
              <Grid.Row
                style={{
                  height: "1em",
                  padding: "5px",
                  paddingBottom: "5px",
                  fontSize: "10px",
                }}
              >
                <Grid.Column style={{ maxHeight: "10px", overflowY: "hide" }}>
                  {stockList.quote.companyName}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row style={{ paddingTop: "15px", paddingBottom: "5px" }}>
                <Grid.Column width={4}>
                  <Icon
                    size="large"
                    name={
                      stockList.quote.change > 0 ? "caret up" : "caret down"
                    }
                    color={stockList.quote.change >= 0 ? "green" : "red"}
                  />
                </Grid.Column>

                <Grid.Column width={4}>
                  <Card.Header>{stock}</Card.Header>
                </Grid.Column>

                <Grid.Column width={4}>
                  {stockList.quote.latestPrice}
                </Grid.Column>

                <Grid.Column width={4}>
                  <Card.Header
                    style={{
                      color: stockList.quote.change >= 0 ? "green" : "red",
                    }}
                  >{`${(stockList.quote.changePercent * 100).toFixed(
                    2
                  )}%`}</Card.Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </div>
    );
  } else {
    return (
      <>
        <Dimmer.Dimmable as={Segment} dimmed={true}>
          <Dimmer active={true} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        </Dimmer.Dimmable>
      </>
    );
  }
};

export default WatchlistCard;
