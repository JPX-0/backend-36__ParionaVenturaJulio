import ProductsDao from '../../models/daos/Products.dao.js';
import STATUS from '../../utils/constants/api.constants.js';
import formatResponse from '../../utils/formatter/send.format.js';
import { createFormat } from '../../utils/formatter/time.format.js';

const productsDao = new ProductsDao();

const getProduct = async (req, res) => { 
  const { idProduct } = req.params;
  const products = await productsDao.getAll();
  if(idProduct) {
    const product = await productsDao.getById(idProduct);
    const message = `the ID: "${idProduct}" entered does not match any product in our database`
    if(!product) return res.status(STATUS.BAD_REQUEST.code).json(formatResponse(false, STATUS.BAD_REQUEST, message));
    return res.status(STATUS.OK.code).json(formatResponse(false, STATUS.OK, product));
  }
  res.status(STATUS.OK.code).json(formatResponse(false, STATUS.OK, products));
}
const postProduct = async (req, res) => { 
  const { title, price, thumbnail  } = req.body;
  if(isNaN(+price)) {
    const message = "the entered price value must be a number";
    return res.status(STATUS.BAD_REQUEST.code).json(formatResponse(true, STATUS.BAD_REQUEST, message));
  }
  if(!title || !price || !thumbnail) {
    const productKeys = [];
    const dataProduct = [ { key: "title", value: title }, { key: "price", value: price }, { key: "thumbnail", value: thumbnail } ];
    dataProduct.forEach(e => !e.value && productKeys.push(e.key));
    const message = `You must correctly fill in the following keys: [${productKeys.join(", ")}]`;
    return res.status(STATUS.BAD_REQUEST.code).json(formatResponse(true, STATUS.BAD_REQUEST, message));
  }
  const newProduct = {
    title,
    price: +price,
    thumbnail
  };
  const idProduct = await productsDao.createItem(createFormat(newProduct));
  const message = `The product with ID: ${idProduct._id} was created successfully!`;
  res.status(STATUS.OK.code).json(formatResponse(false, STATUS.OK, message));
}
// const putProduct = async (req, res) => { 
//   const { params: { idProduct }, body: { title, price, thumbnail }  } = req;
//   const products = await productsDao.getAll();
//   if(idProduct) {
//     console.log("idProduct: ", idProduct);
//     return res.status(STATUS.OK.code).send(`idProduct: ${idProduct}`);
//     // return res.status(STATUS.OK.code).json(formatResponse(false, STATUS.OK, products));
//   }
//   const newProduct = {
//     title,
//     price,
//     thumbnail
//   };
//   console.log("newProduct: ", newProduct);
//   // await productsDao.createItem(createFormat(newProduct));
//   res.status(STATUS.OK.code).send(`newProduct: ${newProduct}`);
// }
// const deleteProduct = async (req, res) => { 
//   const { title, price, thumbnail  } = req.body;
//   const newProduct = {
//     title,
//     price,
//     thumbnail
//   };
//   console.log("newProduct: ", newProduct);
//   // await productsDao.createItem(createFormat(newProduct));
//   res.json({ msg: "ok"});
// }

export {
  getProduct,
  postProduct,
  // putProduct,
  // deleteProduct
}