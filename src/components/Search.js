import {React }  from 'react'
import { Form, Container } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearch } from './appSlice.js'
// import { useHistory } from 'react-router-dom'

const Search = ({handleSearchRequest}) => {

    const searchSymbol = useSelector( state => state.app.searchSymbol)
    const dispatch = useDispatch()
    // const history = useHistory()

    const handleSearch = (event) => {
        event.preventDefault()
        handleSearchRequest()
        dispatch(updateSearch(''))

    }


    return (
      <div style={{padding: '1em'}}>
        <Container>
        <Form style={{padding: '0em'}} onSubmit={handleSearch} width={4}> 
          <Form.Input
            placeholder='Input stock symbol' 
            // label='StoX Search'
            value={searchSymbol}
            onChange={(e)=>dispatch(updateSearch(e.target.value))}
            />
        </Form>
        </Container>
      </div>
    );
}

export default Search
