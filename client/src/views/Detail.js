import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Delete from '../components/Delete';
import { navigate } from '@reach/router';
const Detail = (props) => {
    const [product, setProduct] = useState({})
    const redirectAfterDelete=()=>
    {
        navigate("/product");
    }
    useEffect(() => {
        axios.get("http://localhost:8000/api/productmanager/" + props.id)
            .then(res => setProduct(res.data))
            .catch(err=>navigate("/product/"))
    }, [])
    return (
        <div>
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <button onClick={e=>navigate(`/product/${props.id}/edit`)} className="editBtn">Edit</button>
            <Delete id={props.id} afterDelete={redirectAfterDelete}/>
        </div>
    )
}
export default Detail;

