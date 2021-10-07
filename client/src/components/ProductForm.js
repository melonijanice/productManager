import React, { useState } from 'react';


const ProductForm=(props)=>
{
    const { initialTitle, initialPrice,intitalDescription, onSubmitProp } = props;
    const [title, setTitle] = useState(initialTitle);
    const [price, setPrice] = useState(initialPrice);
    const [description, setDescription] = useState(intitalDescription);
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({title, price,description});
        setTitle("");
        setPrice("");
        setDescription("");
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
            <input type="submit"/>
        </form>
    </div>)
}
export default ProductForm;