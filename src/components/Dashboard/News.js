import React from 'react'
import { useSelector } from 'react-redux'
import NewsCard from './NewsCard'
import {Container, Item} from 'semantic-ui-react'

const News = () => {
    // const [news, setNews] = useState([])
    const newsdata = useSelector( state => state.app.news)

    if(newsdata[0]) {
    

    const newsComponents = newsdata.map( news => <NewsCard key={newsdata.indexOf(news)} news={news}/>)

    return (

        <Container style={{height: '35em', overflowY: 'scroll', paddingBottom: '1em'}}> 
            <Item.Group divided>
                {newsComponents}
            </Item.Group>    
        </Container>
    )
    } else {
     return ( <></>)
    }
}

export default News
