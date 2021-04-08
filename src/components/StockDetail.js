import React from "react";
import { Container, Grid, Table, Label, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom"

const StockDetail = () => {
  // let history = useHistory();
  const stockInfo = useSelector((state) => state.app.stockInfo);
  const keyData = useSelector( state => state.app.keyData );
  console.log(stockInfo);
  return (
    <div>
      <Container style={{ padding: "1em" }}>
        <Grid>
          <Grid.Row centered>CHART Component Placeholder</Grid.Row>

          <Grid.Row>  
              <Grid.Column width={16}>
                <Header as='h3' dividing style={{padding: '.5em'}}>
                {`Profile: ${stockInfo.company_name}`}
                </Header>
                <Container style={{fontSize: '1.25em', textAlign: 'Left', fontFamily: 'Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif'}}>{stockInfo.description}</Container>
              </Grid.Column>
            </Grid.Row>

          <Grid.Row>
            {/* <Grid columns={2}>
                            <Grid.Column>
                                Static Profile Info
                                <br></br>
                                {stockInfo.company_name}
                            </Grid.Column>
                            
                            <Grid.Column>
                                Updated API Info
                            </Grid.Column>
                        </Grid> */}
            <Grid.Column width={5}>
              <Table celled striped >
                <Table.Body>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Company Name</Label>
                      {`${stockInfo.company_name} - (${stockInfo.symbol})`}
                    </Table.Cell>
                  </Table.Row>
                  
                  <Table.Row>
                    <Table.Cell style={{fontSize: '.8em'}}>
                        <Label horizontal> Exchange  </Label>
                        {stockInfo.exchange} 
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> Sector  </Label>
                        {stockInfo.sector}
                      </Table.Cell> 
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> Industry  </Label>
                        {stockInfo.industry} 
                      </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> Website  </Label>
                        {stockInfo.website} 
                      </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> CEO  </Label>
                        {stockInfo.ceo} 
                      </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> Employees  </Label>
                        {stockInfo.employees} 
                      </Table.Cell>
                  </Table.Row>

                </Table.Body>
              </Table>
            </Grid.Column>


            <Grid.Column width={5}>
            <Table celled striped >
                <Table.Body>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Market Capitalization</Label>
                      {keyData.market_cap_dollar}
                    </Table.Cell>
                  </Table.Row>
                  
                  <Table.Row>
                    <Table.Cell>
                        <Label horizontal> 52 Week Range  </Label>
                        {`${keyData.week_52_low_dollar} - ${keyData.week_52_high_dollar}`}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> Shares Outstanding  </Label>
                        {new Intl.NumberFormat().format(keyData.shares_outstanding)}
                      </Table.Cell> 
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> Avg 10 Day Volume </Label>
                        { new Intl.NumberFormat().format(keyData.avg_10_volume)} 
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
                        <Label horizontal> Earnings Per Share  </Label>
                        {keyData.ttm_eps.toFixed(2)}
                      </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> Beta  </Label>
                        {keyData.beta.toFixed(2)} 
                      </Table.Cell>
                  </Table.Row>

                </Table.Body>
              </Table>

            </Grid.Column>

            <Grid.Column width={6}>
            <Table celled striped >
                <Table.Body>

                  <Table.Row>
                    <Table.Cell>
                      <Label horizontal> Dividend Yield </Label>
                      {keyData.dividend_yield >= 0.01 && keyData.dividend_yield.toFix(2)}
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
                        <Label horizontal> Next Earnings Date  </Label>
                        {keyData.next_earnings_date}
                      </Table.Cell> 
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> PE Ratio  </Label>
                        {keyData.pe_ratio.toFixed(2)} 
                      </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> %Change 1/2/5 year  </Label>
                        {`${keyData.year_1_change_percent_s} / ${keyData.year_2_change_percent_s} / ${keyData.year_5_change_percent_s}`} 
                      </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> %Change 1/3/6 month  </Label>
                        {`${keyData.month_1_change_percent_s} / ${keyData.month_3_change_percent_s} / ${keyData.month_6_change_percent_s}`}
                      </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                      <Table.Cell>
                        <Label horizontal> YTD Percent Change  </Label>
                        {keyData.ytd_change_percent_s} 
                      </Table.Cell>
                  </Table.Row>

                </Table.Body>
              </Table>

            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>Suggested Stock Section</Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default StockDetail;
