import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

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
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(6)
            .required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        const message = error.details && error.details[0] ? error.details[0].message : 'Validation error';
        return res.status(400).json({ error: message });
    }
    next();
}

// this middleware validates the registration request body
// it uses Joi to ensure that the first name, last name, email, and password meet specified criteria
// if validation fails, it returns a 400 status with an error message
// if validation passes, it calls the next middleware or controller
// this middleware is part of the authentication module of the application
// it ensures that user registration requests are properly formatted before processing

