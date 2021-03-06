import {useState} from "react";
import {
  Container,
  Grid,
  Table,
  Label,
  Header,
  Button,
  Dimmer,
  Loader,
  Segment,
  Checkbox
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import StockChart from "./StockChart";
import {updateUser} from '../appSlice'
import CandlestickChart from "./CandlestickChart";

const StockInfo = ({ addToWishlist }) => {
  const [chart, setChart] = useState(true)
  const stockInfo = useSelector((state) => state.app.stockInfo);
  const keyData = useSelector((state) => state.app.keyData);
  const user = useSelector( state => state.app.user)
  const dispatch = useDispatch()



  const handleAddClick = (event) => {
    event.preventDefault();
    if ( user.name === 'Guest' ) {
      alert('Please sign in to add to watchlist')
    } else {
      addToWishlist()
    }
  };

  const handleRemoveClick = (event) => {
    event.preventDefault();

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/watchstock/${user.watchlists[user.loadwatchlist].id}/${stockInfo.symbol}`,
      {
        method: "DELETE",
      }
    )
      .then((r) => r.json())
      .then((renderUser) => {
        dispatch(updateUser(renderUser));
      });
    
  }

  

  return Object.keys(keyData).length ? (
    <div>
      <Container style={{ padding: "1em" }}>
        <Grid>
          <Grid.Row style={{paddingTop: '0em'}}>
            <Checkbox toggle onChange={()=>setChart(!chart)}style={{margin: '0em 1em'}}/>
            {chart ? <StockChart /> : <CandlestickChart/> }
          </Grid.Row>

          <Grid.Row>
            <Container>
              {!user.watchlists[user.loadwatchlist].arrayList.includes(stockInfo.symbol) ? 
              <Button onClick={(e) => handleAddClick(e)} color='black' style={{borderColor: 'white', border: 'solid', borderWidth: '2px'}}  > Add to Watchlist</Button>
              :
              <Button color='red' onClick={(e)=>handleRemoveClick(e)} style={{borderColor: 'white', border: 'solid', borderWidth: '2px'}}> Remove from Watchlist</Button>
              }
            </Container>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h3" dividing style={{ padding: ".5em", fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', color: 'white', fontSize: '20px', fontWeight: '700' }}>
                {`Profile: ${stockInfo.company_name ? stockInfo.company_name : stockInfo.companyName}`}
              </Header>
              <Container
                fluid
                style={{
                  fontSize: "1.25em",
                  textAlign: "Left",
                  fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif',
                  backgroundColor: 'white',
                  padding: '1em', 
                  opacity: '.95'
                }}
              >
                {stockInfo.description}
              </Container>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}>
              <Table style={{opacity: '.93'}}>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Company Name</Label>
                      {`${stockInfo.company_name ? stockInfo.company_name : stockInfo.companyName} - (${stockInfo.symbol})`}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell style={{ fontSize: ".8em" }}>
                      <Label horizontal> Exchange </Label>
                      {stockInfo.exchange}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Sector </Label>
                      {stockInfo.sector}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Industry </Label>
                      {stockInfo.industry}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Website </Label>
                      {stockInfo.website}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> CEO </Label>
                      {stockInfo.ceo}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Employees </Label>
                      {new Intl.NumberFormat().format(stockInfo.employees)} 
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>

            <Grid.Column width={5}>
              <Table style={{opacity: '.95'}}>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Market Capitalization</Label>
                      {keyData.market_cap_dollar}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> 52 Week Range </Label>
                      {`${keyData.week_52_low_dollar} - ${keyData.week_52_high_dollar}`}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Shares Outstanding </Label>
                      {new Intl.NumberFormat().format(keyData.shares_outstanding)}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Avg 10 Day Volume </Label>
                      {new Intl.NumberFormat().format(keyData.avg_10_volume)}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Average 30 Day Volume </Label>
                      {new Intl.NumberFormat().format(keyData.avg_30_volume)}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Earnings Per Share </Label>
                      {keyData.ttm_eps.toFixed(2)}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Beta </Label>
                      {keyData.beta.toFixed(2)}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>

            <Grid.Column width={6}>
              <Table style={{opacity: '.93'}}>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Dividend Yield </Label>
                      {keyData.dividend_yield >= 0.01 && keyData.dividend_yield}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Next Dividend Date </Label>
                      {keyData.next_dividende_date}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Next Earnings Date </Label>
                      {keyData.next_earnings_date}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> PE Ratio </Label>
                      {keyData.pe_ratio.toFixed(2)}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> %Change 1/2/5 year </Label>
                      {`${keyData.year_1_change_percent_s} / ${keyData.year_2_change_percent_s} / ${keyData.year_5_change_percent_s}`}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> %Change 1/3/6 month </Label>
                      {`${keyData.month_1_change_percent_s} / ${keyData.month_3_change_percent_s} / ${keyData.month_6_change_percent_s}`}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> YTD Percent Change </Label>
                      {keyData.ytd_change_percent_s}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered style={{fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', color: 'white', fontSize: '20px', fontWeight: '700'}}>Suggested StoX</Grid.Row>
        </Grid>
      </Container>
    </div>
  ) : (
    <>
      <Dimmer.Dimmable as={Segment} dimmed={true}>
        <Dimmer active={true} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    </>
  );
};

export default StockInfo;
