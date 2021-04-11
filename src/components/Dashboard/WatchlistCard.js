import React from "react";
import { Card, Statistic, Icon} from "semantic-ui-react";
import { useSelector } from "react-redux";

const WatchlistCard = ({ stock }) => {
  const stockList = useSelector((state) => state.app.batchWatchlist[stock]);
//   console.log(quote);

  return (
    
    stockList.quote ? 

    (<div style={{ padding: ".5em" }}>
      <Card style={{ padding: ".5em" }}>
        <Statistic.Group size='mini' widths={'12'}>
          <Statistic>
            <Statistic.Value>
              <Icon size='large' name={stockList.quote.change > 0 ? 'caret up' : 'caret down'} color={stockList.quote.change >= 0 ?'green' : 'red'} />
            </Statistic.Value>
          </Statistic>

          <Statistic>
            <Statistic.Value>{stock}</Statistic.Value>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              {`$${stockList.quote.latestPrice}`}
            </Statistic.Value>
          </Statistic>

          <Statistic color={stockList.quote.change >= 0 ?'green' : 'red'}>
            <Statistic.Value >
              {`${(stockList.quote.changePercent*100).toFixed(2)}%`}
            </Statistic.Value>
          </Statistic>
        </Statistic.Group>
      </Card>
    </div>)
    : <></>
  );
};

export default WatchlistCard;
