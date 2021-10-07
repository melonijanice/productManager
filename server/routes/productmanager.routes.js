const ProductManagerController = require('../controllers/productmanager.controller');
module.exports = function(app){
    app.post('/api/productmanager', ProductManagerController.createProduct);     /* This is new */
    app.get('/api/productmanagers', ProductManagerController.getProducts);
    app.get('/api/productmanager/:id', ProductManagerController.getProduct);
    app.put('/api/productmanager/:id',ProductManagerController.update);
    app.delete('/api/productmanager/:id',ProductManagerController.delete);


}
