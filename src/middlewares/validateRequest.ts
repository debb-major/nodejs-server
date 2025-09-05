import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


// an endpoint that validates the registration request body

// this middleware validates the registration request body (validation middleware)
// it uses Joi to ensure that the first name, last name, email, and password meet specified criteria
// if validation fails, it returns a 400 status with an error message
// if validation passes, it calls the next middleware or controller
// this middleware is part of the authentication module of the application
// it ensures that user registration requests are properly formatted before processing

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(30)
      .required(),

    lastName: Joi.string()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .lowercase() // normalize email to lowercase
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(6)
      .required(),
  });
  
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message);
    const validationError: any = new Error(messages.join(", "));
    validationError.statusCode = 400;
    return next(validationError); // send to errorHandler
  }

  req.body = value; // put normalized + validated values back
  next();
}

// an endpoint that validates the login request body

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .lowercase() // normalize defensively
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message);
    const validationError: any = new Error(messages.join(", "));
    validationError.statusCode = 400;
    return next(validationError); // send to errorHandler
  }

  req.body = value; // clean + normalized
  next();
};

// Event creation validation
export const validateCreateEvent = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    date: Joi.date().iso().greater("now").required(), // must be a future date
    location: Joi.string().min(3).max(200).required(),
    ticketPrice: Joi.number().min(0).required(),
    capacity: Joi.number().integer().min(1).required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  req.body = value;
  next();
};

// Event update validation (all fields optional, but still validated if present)
export const validateUpdateEvent = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(1000),
    date: Joi.date().iso().greater("now"),
    location: Joi.string().min(3).max(200),
    ticketPrice: Joi.number().min(0),
    capacity: Joi.number().integer().min(1),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  req.body = value;
  next();
};


