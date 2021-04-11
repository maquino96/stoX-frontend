import React from 'react'
import { useSelector } from 'react-redux' 
import { Container, Card } from 'semantic-ui-react'
import StockCard from './StockCard'

const SimilarContainer = ({handleSearchRequest}) => {
    const similarObj = useSelector( state => state.app.similarStock)
    // console.log(similarObj)

    const similarComponents = similarObj.map( simstock => <StockCard key={simstock} stock={simstock} handleSearchRequest={handleSearchRequest}/>)

    return (
        <div>
            <Container style={{overflowY: 'hidden', overflowX: 'scroll', height: '18em'}}>
                <Card.Group itemsPerRow={similarObj.length} style={{width: '150%', padding: '1em'}}> 
                    {similarComponents}
                </Card.Group>
                
            </Container>
            
        </div>
    )
}

export default SimilarContainer
