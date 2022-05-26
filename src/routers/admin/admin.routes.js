import express from 'express';
import { getProduct, postProduct } from '../../controllers/admin.controller.js';
import isAdmin from '../../middlewares/isAdmin.middleware.js';

const adminRoutes = express.Router();


adminRoutes.get('/get/products', getProduct);
adminRoutes.get('/get/products/:idProduct', getProduct);
adminRoutes.post('/post/products', isAdmin, postProduct);
// adminRoutes.put('/put/products/:idProduct', isAdmin, putProduct);
// adminRoutes.delete('/delete/products/:idProduct', deleteProduct);

export default adminRoutes;