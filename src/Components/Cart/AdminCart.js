import React from 'react';
import {Card,Popconfirm } from 'antd';
import {Link} from 'react-router-dom';
import { DeleteOutlined,EditOutlined,LoginOutlined} from '@ant-design/icons';
import Laptop from '../../Images/laptop.jpg';
const { Meta } = Card;

function AdminCart({product,handleRemove}){
    console.log(product)

    return(
        <Card
        // hoverable
        cover={<img alt="example" src={product.images.length? product.images[0].url:Laptop} style={{ height:'150px',objectFit:'cover'}}/>}
        actions={[<Popconfirm
            title="Are you sure to delete this Product?"
            onConfirm={()=>handleRemove(product.slug)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined  className='text-danger'/>
            </Popconfirm>,
            <Link to={`/admin/product/${product.slug}`}>
            <EditOutlined className='text-warning'/>
            </Link>
        ]}
        className='m-2'
      >
        <Meta title={product.title} description={`${product.description.substring(0,40)}....`} />
      </Card>
    )

}

export default AdminCart;