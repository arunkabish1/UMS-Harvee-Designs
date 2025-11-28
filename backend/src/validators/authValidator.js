import Joi from 'joi';

export const registerValidator = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().max(150).allow(null, ""),
  state: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  pincode: Joi.string().min(4).max(10).required(),
});