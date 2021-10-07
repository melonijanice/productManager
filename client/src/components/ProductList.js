import React from 'react';
import { Link } from '@reach/router';
import Delete from '../components/Delete';



const ProductList =(props)=>
{
    const {products,removefromDOM}=props;

    const updateAfterDelete =(deletedproductId)=>{
        removefromDOM(deletedproductId);
    }
    
    return(<div>{products.map((product, idx)=>{return <p key={idx}>
    <Link to = {"/product/"+ product._id}>{product.title}</Link>
    <Delete id={product._id} afterDelete={updateAfterDelete}/>
    </p>})}</div>)
}

export default ProductList;
