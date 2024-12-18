import jwt from 'jsonwebtoken';
import actorsModule from '../models/actorsModule.mjs';


export default async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await actorsModule.findById(decoded._id);

      if (!user) {
        return res.status(403).json({
          message: 'Пользователь не найден',
        });
      }

      req.user = user;

      next();
    } catch (err) {
      return res.status(500);
    }
  } else {
    return res.status(500);
  }
};