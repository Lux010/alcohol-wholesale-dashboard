import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation rules for example entity
export const productValidationRules = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),
  ];
};

// The validation middleware handler
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    message: "Validation failed",
    errors: errors.array(),
  });
};

// Combined middleware for easy use
export const validateProduct = [productValidationRules(), validate];
