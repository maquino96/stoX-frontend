import {useState} from "react";
import {
  Card,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Grid
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../appSlice'

const WatchlistCard = ({ stock, handleSearchRequest }) => {
  const [hover, setHover] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.app.user)
  const stockList = useSelector((state) => state.app.batchWatchlist[stock]);
  //   console.log(stock)

  const handleWidgetDelete = (event) => {
    event.preventDefault()
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/watchstock/${user.watchlists[user.loadwatchlist].id}/${stock}`,
      {
        method: "DELETE",
      }
    )
      .then((r) => r.json())
      .then((renderUser) => {
        dispatch(updateUser(renderUser));
      });

  }

  if (stockList) {
    return (
      <Card.Group style={{ paddingLeft: user.name==='Guest' ? '4em' : "3.5em", paddingTop: '0px', marginTop: '0px' }}>
        <Card className='widgetCard' style={{marginRight: '0px', opacity: '1'}} onClick={(e)=>handleSearchRequest(stock)}>
          <Card.Content>
          <Grid textAlign='center'>
{/* 
          <Grid.Row style={{height: '1em', padding: '5px', paddingBottom: '5px', fontSize: '10px'}}>
              <Grid.Column style={{ maxHeight:'10px', overflowY: 'hide' }}>
              {stockList.quote.companyName}
              </Grid.Column>
            </Grid.Row> */}

            <Grid.Row style={{paddingTop: '15px', paddingBottom: '5px'}}>
            <Grid.Column width={4}>
            <Icon
                  size="large"
                  name={stockList.quote.change > 0 ? "caret up" : "caret down"}
                  // color={stockList.quote.change >= 0 ? "green" : "red"}
                  style={{color: stockList.quote.change >= 0 ? "green" : "red" }}
            />
            </Grid.Column>

            <Grid.Column width={4}>
            <Card.Header>{stock}</Card.Header>  
            </Grid.Column>

            <Grid.Column width={4}>
              {stockList.quote.latestPrice}
            </Grid.Column>
            
            <Grid.Column width={4}>
             <Card.Header style={{color: stockList.quote.change >= 0 ? "green" : "red"}}>{`${(stockList.quote.changePercent * 100).toFixed(2)}%`}</Card.Header>
            </Grid.Column>
            </Grid.Row>
            
          </Grid>
          </Card.Content>
        </Card>
        { user.name !== 'Guest' &&  
        <Icon onClick={(e)=>handleWidgetDelete(e)} onMouseEnter={(e)=>setHover(true)} onMouseLeave={()=>setHover(false)} name='close' size='large' style={{marginTop: '12px', color: hover && 'red'}}/>
        }
        </Card.Group>
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
