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

        <Container style={{height: '34.5em', overflowY: 'scroll', paddingBottom: '1em'}}> 
            <Item.Group divided>
                {newsComponents}
            </Item.Group>    
        </Container>
    )
    } else {
     return ( <Container style={{minHeight: '5em'}}></Container>)
    }
}

export default News
