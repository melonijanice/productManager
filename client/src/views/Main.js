import React, { useEffect, useState } from 'react'

import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import axios from 'axios';
const Main = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/productmanagers')
            .then(res=>{
                setProducts(res.data);
                console.log("all products"+ res.data)
                
            });
    },[])
    const removefromDOM =(deletedproductId)=>{
        let filteredProductArray=products.filter((productObj)=>{
            return productObj._id!==deletedproductId;
        })
        setProducts(filteredProductArray)
    }
   const createProducts=(product)=>
   {
    
       //make a post request to create a new person
       axios.post('http://localhost:8000/api/productmanager', product)
           .then(res=>{setProducts([...products, res.data]);
            console.log("Created Products" + [...products, res.data]);
        })
           .catch(err=>console.log(err))
   }
    return (
        <div>
           <ProductForm onSubmitProp={createProducts} initialTitle="" initialPrice="" initialDescription=""/>
           <hr/>
           <ProductList products={products} removefromDOM={removefromDOM}/>
        </div>
    )
}
export default Main;
