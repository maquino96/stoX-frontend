import {useState} from 'react'
import { Item, Container } from 'semantic-ui-react'

const NewsCard = ({news}) => {

    const [hidden, setHidden] = useState(true)

    const handleArticleClick = (event) => {
        event.preventDefault()
        news.url&&
        window.open(news.url, "_blank")

    }

    return (
        <Item onClick={()=>setHidden(!hidden)}>
        {news.image &&
        <Item.Image src={news.image} style={{marginTop: '2em'}}/>
        }
  
        <Item.Content>
          <div style={{paddingTop: hidden && '2em', fontSize: hidden ? '20px' : '16px'}}>
          <Item.Header as='a' onClick={(e)=>handleArticleClick(e)}>{news.headline}</Item.Header>
          <Item.Meta style={{fontSize: hidden ? '14px' : '10px'}}>
            <span className='source'>Source: {news.source}</span>
          </Item.Meta>
          </div>
          { hidden ? <></> : <Container style={{textAlign: 'left', height: '7.5em', overflowY: 'scroll'}}>{news.summary}</Container>}
          

        </Item.Content>
      </Item>
    )
}

export default NewsCard
