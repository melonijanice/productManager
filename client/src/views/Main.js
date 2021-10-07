import React, { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import axios from 'axios';
import io from 'socket.io-client';

const Main = () => {
    const [products, setProducts] = useState([]);
    //const [socket] = useState(() => io(':8000'));
    const [socket] = useState(() => io('http://localhost:8000'));
    
    useEffect(()=>{
        console.log("Inside Socket.io");
        //socket.on("connect",()=>{console.log("we are connected"+socket.id);})
        console.log(socket);
        socket.on("connect", () => {
            console.log("Connected on the client - ID: " + socket.id)
        })
        
        socket.on('product_added', (data) => {
            setProducts((currentProducts)=>[data,...currentProducts]);
            console.log(data);
        });
        return ()=>socket.disconnect;
        //console.log(socket.connection);
        //return socket.disconnect();   
    },[])
    useEffect(()=>{
        axios.get('http://localhost:8000/api/productmanagers')
            .then(res=>{
                setProducts(res.data);
                //console.log("all products"+ res.data)   
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
           .then(res=>{
               //send this message to server directly
            console.log("sending data to socket",res.data)
            socket.emit('added_product',res.data);
            socket.disconnect();
               setProducts([...products, res.data]);
            
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
