import React, {useState} from 'react';
import axios from 'axios';
const ProductManager=()=>
{
     //keep track of what is being typed via useState hook
     const [title, setTitle] = useState(""); 
     const [price, setPrice] = useState("");
     const [description, setDescription] = useState("");
    const onSubmitHandler=(event)=>
    {
        //prevent default behavior of the submit
        event.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/productmanager', {
            title,
            price,  
            description
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    
    
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Title</label><br/>
                <input type="text" onChange = {(e)=>setTitle(e.target.value)}/>
            </p>
            <p>
                <label>Price</label><br/>
                <input type="text" onChange = {(e)=>setPrice(e.target.value)}/>
            </p>
            <p>
                <label>Description</label><br/>
                <input type="text" onChange = {(e)=>setDescription(e.target.value)}/>
            </p>
            <input type="submit"/>
        </form>
    )
}
export default ProductManager;