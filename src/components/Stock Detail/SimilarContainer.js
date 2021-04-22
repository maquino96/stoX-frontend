import React from "react";
import { useSelector } from "react-redux";
import { Container, Card, Dimmer, Loader, Segment } from "semantic-ui-react";
import StockCard from "./StockCard";

const SimilarContainer = ({ handleSearchRequest }) => {
  const similarObj = useSelector((state) => state.app.similarStock);
  // console.log(similarObj)

  if (similarObj) {
    const similarComponents = similarObj.map((simstock) => (
      <StockCard
        key={simstock}
        stock={simstock}
        handleSearchRequest={handleSearchRequest}
      />
    ));

    return (
      <div>
        <Container
          style={{ overflowY: "hidden", overflowX: "scroll", height: "14.5em" }}
        >
          <Card.Group
            itemsPerRow={similarObj.length}
            style={{ width: "150%", padding: "1em"}}
          >
            {similarComponents}
          </Card.Group>
        </Container>
      </div>
    );
  } else {
    return (
      <Container style={{ overflowY: "hidden", overflowX: "scroll", height: "18em" }}>
        <Dimmer.Dimmable as={Segment} dimmed={true} style={{height: '7em'}}>
          <Dimmer active={true} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        </Dimmer.Dimmable>
      </Container>
    );
  }
};

export default SimilarContainer;
