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
        <Item onClick={()=>setHidden(!hidden)} style={{backgroundColor: 'white', opacity: '0.95'}}>
        {news.image &&
        <Item.Image src={news.image} style={{marginTop: '2em', marginLeft: '1em', marginBottom: '1em'}}/>
        }
  
        <Item.Content>
          <div style={{paddingTop: hidden && '1.5em', fontSize: hidden ? '20px' : '16px'}}>
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
