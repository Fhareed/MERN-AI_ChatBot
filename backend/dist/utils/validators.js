import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        // To check for errrors 
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break; //if they are no errors it breaks out of the loop
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain at least 6 characters")
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
//# sourceMappingURL=validators.js.map