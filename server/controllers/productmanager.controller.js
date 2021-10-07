const ProductManager = require('../models/productmanager.model'); 
module.exports.createProduct = (request, response) => {
        const { title, price, description } = request.body;
    ProductManager.create({
            title,
            price,
            description
        })
            .then(product => response.json(product))
            .catch(err => response.json(err));
    }

module.exports.getProducts=(request,response)=>{
    ProductManager.find({})
            .then(product => response.json(product))
            .catch(err => response.json(err));
}

module.exports.getProduct = (request, response) => {
    ProductManager.findOne({_id:request.params.id})
        .then(product => response.json(product))
        .catch(err => response.json(err))
}
module.exports.update=(request,response)=>
{
    ProductManager.findByIdAndUpdate
    (request.params.id,request.body,{new:true,runValidators:true}//return updated objects and run the validators that were used for update
        
        )
    .then(updatedProduct=>response.json(updatedProduct))
    .catch(err=>{
        response.status(400).json(err)
        console.log("Error adding to DB at API");
        response.json(err)})
}

module.exports.delete=(request,response)=>
{
    ProductManager.findByIdAndDelete(request.params.id)
    .then(deletedproduct=>response.json(deletedproduct))
    .catch(err=>response.json(err))
}
