import express from 'express';
import UsersDao from '../../../models/daos/Users.dao.js';
import auth from '../../middlewares/auth.middleware.js';
const userDao = new UsersDao();

const profileRoutes = express.Router();

profileRoutes.get('/', auth, async (req, res) => { 
  const user = {
    name: `${req.user.firstname} ${req.user.lastname}`,
    avatar: req.user.avatar,
    location: req.user.location,
    phone: req.user.phone,
    createdAt: req.user.createdAt,
  }
  res.render('profile', { ...user });
});
profileRoutes.get('/img/:nameUser', async (req, res) => { 
  const { nameUser } = req.params;
  const user = await userDao.getById(nameUser);
  res.send(`<img src="${user.avatar}" alt="avatar de: ${user.firstname} ${user.lastname}">`);
});

export default profileRoutes;