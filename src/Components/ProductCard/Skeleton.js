import React from 'react';
import {Card,Popconfirm } from 'antd';
import {Link} from 'react-router-dom';
import { DeleteOutlined,EditOutlined,LoginOutlined} from '@ant-design/icons';
import Laptop from '../../Images/laptop.jpg';
const { Meta } = Card;

function Skeleton({loading,count}){
return (
    <>
    {
        Array(3).fill().map(x=>(
            <div className='col-md-4'>
            <Card
            style={{
              width: 300,
              marginTop: 16,
            }}
            loading={loading}
            className='m-2'
          >
            <Meta
            //   avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
          </div>
        ))
    }
    </>
)

}

export default Skeleton;