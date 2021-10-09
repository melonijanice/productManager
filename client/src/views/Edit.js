import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link,navigate } from '@reach/router';
import Delete from '../components/Delete';
import ProductForm from '../components/ProductForm';
const Edit=(props)=>
{
     //keep track of what is being typed via useState hook
     const [title, setTitle] = useState(""); 
     const [price, setPrice] = useState("");
     const [description, setDescription] = useState("");
     const [errors, setErrors] = useState({});
     const [loaded, setLoaded] = useState(false);
     const redirectAfterDelete=()=>
    {
        navigate("/product");
    }
     useEffect(()=>{
         axios.get('http://localhost:8000/api/productmanager/'+props.id)
             .then(res=>{
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
                setLoaded(true);
             })
             .catch(err=>navigate("/product/"));
     },[])
    const UpdateProduct=(updatedProduct)=>
    {
        //prevent default behavior of the submit
        console.log(updatedProduct);
        setTitle(updatedProduct.title);
        setPrice(updatedProduct.price);
        setDescription(updatedProduct.description);
        
        axios.put('http://localhost:8000/api/productmanager/'+props.id,updatedProduct)
            .then(res=>{console.log(res);
                navigate("/product/"+props.id)
            })
            .catch(err=>
                setErrors(err.response.data.errors)
                )
    }
    
    
    return (<div>
         {loaded && <ProductForm onSubmitProp={UpdateProduct} initialTitle={title} initialPrice={price} initialDescription={description} errorData={errors}/>}
            <Delete id={props.id} afterDelete={redirectAfterDelete}/>
        </div>
    )
}
export default Edit;