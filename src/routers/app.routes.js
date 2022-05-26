import path from 'path';
import express from 'express';
import authRoutes from './auth/auth.routes.js';
import auth from '../middlewares/auth.middleware.js';
import profileRoutes from './profile/profile.routes.js';
import adminRoutes from './admin/admin.routes.js';
import { getError, getHome, getProducts, getCart, getInfo, getLogout, getDetails, pushCart, buyCart } from '../controllers/routes.controller.js';
import compression from 'compression';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/admin', auth, adminRoutes);

router.get('/', (req, res) => {
  const user = req.user;
  if(user) return res.redirect('/home');
  res.sendFile(path.join(process.cwd(), "/public/login.html"));
});

const isCompression = [];
for (let i = 0; i < process.argv.length; i++) {
  if(process.argv[i] == "-c") 
    isCompression.push(process.argv[i + 1] == "false" ? false : process.argv[i + 1] == "true" ? true : process.argv[i + 1]);
  else isCompression[0] = true;
}
if(isCompression[0]) router.get('/info', compression(), getInfo);
else router.get('/info', getInfo);

router.get('/register-error', (req, res) => getError(req, res, "register-error"));
router.get('/login-error', (req, res) => getError(req, res, "login-error"));

router.use(auth);

router.get('/home', getHome);
router.get('/products', getProducts);
router.get('/detail/:idProduct', getDetails);
router.post('/add', pushCart);
router.get('/cart', getCart);
router.get('/buy', buyCart);

router.get('/logout', getLogout);


export default router;