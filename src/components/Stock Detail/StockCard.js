import React from "react";
import { Card } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../appSlice";

const StockCard = ({ stock, handleSearchRequest }) => {
  const dispatch = useDispatch();

  let simObj = useSelector( state => state.app.batchSimInfo)
//   let changepercent = quote.changePercent
//   let change = quote.change
//   console.log(quote)
    // The above is a possible work around so that functions like toFixed() can read data, something to do with native code (?) 

  const handleClick = (event) => {
    event.preventDefault()
    dispatch(updateSearch(stock))
    handleSearchRequest()
    dispatch(updateSearch(''))
  };

  return (

    simObj[stock] ?  
    
    <Card onMouseOver={()=>dispatch(updateSearch(stock))} onClick={()=>{handleSearchRequest()}} style={{width: '15em', padding: '1em'}}>
      <Card.Content>
        <Card.Header>{stock}</Card.Header>
        <Card.Meta>{simObj[stock].quote.companyName}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Header>{ simObj[stock].quote.latestPrice === 'close' ? simObj[stock].quote.close : simObj[stock].quote.latestPrice}</Card.Header>
        <div style={{textAlign: 'right', color: simObj[stock].quote.change > 0 ? 'green' : 'red' }}>
            {`(${simObj[stock].quote.change}) ${(simObj[stock].quote.changePercent*100)}%`}

        </div>
      </Card.Content>
    </Card>

    : <></>
    
    
  );
};

export default StockCard;
