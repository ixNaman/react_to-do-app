import { Card, Space } from 'antd';
import './card.css'

const Cards = () => {
  return (
    <>    
    <div className="divclass">
        <Space className='space' direction="vertical" size={16}>
        <Card id='1' title="Task 1" extra={<a href="#">Edit</a>} style={{ width: 300 }} >
          <p>hello world</p>
        
        </Card>
        <Card id='2' size="large" title="Task 2" extra={<a href="#">Edit</a>} style={{ width: 300 }}>
          <p>climb up to bronze</p>
         
        </Card>
      </Space>
  </div>
    </>

  )
}

export default Cards