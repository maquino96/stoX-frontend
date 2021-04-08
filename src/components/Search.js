import {React }  from 'react'
import { Form, Segment, Container } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearch } from './appSlice.js'
import { useHistory } from 'react-router-dom'

const Search = ({handleSearchRequest}) => {

    const searchSymbol = useSelector( state => state.app.searchSymbol)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSearch = (event) => {
        event.preventDefault()
        // dispatch(updateSearch(symbol))
        // console.log(searchSymbol)
        handleSearchRequest()
        dispatch(updateSearch(''))
        history.push('/stockdetail')

        // setSymbol('')
    }


    return (
      <div>
        <Container>
        <Segment raised>
        <Form style={{padding: '.5em'}} onSubmit={handleSearch} width={4}> 
          <Form.Input
            label='Stock Search'
            value={searchSymbol}
            onChange={(e)=>dispatch(updateSearch(e.target.value))}
            />
        </Form>
        </Segment>
        </Container>
      </div>
    );
}

export default Search
