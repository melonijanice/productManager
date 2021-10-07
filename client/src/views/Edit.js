import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link,navigate } from '@reach/router';
import Delete from '../components/Delete';
const Edit=(props)=>
{
     //keep track of what is being typed via useState hook
     const [title, setTitle] = useState(""); 
     const [price, setPrice] = useState("");
     const [description, setDescription] = useState("");
     const redirectAfterDelete=()=>
    {
        navigate("/restaurants");
    }
     useEffect(()=>{
         axios.get('http://localhost:8000/api/productmanager/'+props.id)
             .then(res=>{
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
             });
     },[])
    const onSubmitHandler=(event)=>
    {
        //prevent default behavior of the submit
        event.preventDefault();
        
        axios.put('http://localhost:8000/api/productmanager/'+props.id, {
            title,
            price,  
            description
        })
            .then(res=>{console.log(res);
                navigate("/product/"+props.id)
            })
            .catch(err=>console.log(err))
    }
    
    
    return (<div>
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Title</label><br/>
                <input type="text" value={title} onChange = {(e)=>setTitle(e.target.value)}/>
            </p>
            <p>
                <label>Price</label><br/>
                <input type="text" value={price} onChange = {(e)=>setPrice(e.target.value)}/>
            </p>
            <p>
                <label>Description</label><br/>
                <input type="text" value={description} onChange = {(e)=>setDescription(e.target.value)}/>
            </p>
        </form>
        <button className="editBtn" type="submit" onClick={onSubmitHandler}>Update Restaurant</button>
        <Delete id={props.id} afterDelete={redirectAfterDelete}/>
        </div>
    )
}
export default Edit;