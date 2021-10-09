import React, { useState} from 'react';


const ProductForm=(props)=>
{
    const { initialTitle, initialPrice,initialDescription, onSubmitProp,errorData} = props;
    const [title, setTitle] = useState(initialTitle);
    const [price, setPrice] = useState(initialPrice);
    const [description, setDescription] = useState(initialDescription);
    

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({title, price,description});
    }
        
    return (<div>
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Title</label><br/>
                <input type="text" value={title} onChange = {(e)=>setTitle(e.target.value)}/>
                {errorData && errorData.title &&(<span>{errorData.title.message}</span>)}
               
            </p>
            <p>
                <label>Price</label><br/>
                <input type="text" value={price} onChange = {(e)=>setPrice(e.target.value)}/>
                {errorData && errorData.price &&(<span>{errorData.price.message}</span>)}
            </p>
            <p>
                <label>Description</label><br/>
                <input type="text" value={description} onChange = {(e)=>setDescription(e.target.value)}/>
                {errorData && errorData.description &&(<span>{errorData.description.message}</span>)}
            </p>
            <input type="submit"/>
        </form>
    </div>)
}
export default ProductForm;