import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticaded);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().min(6),
      password_confirmation: Joi.string().min(6).valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
