// controllers/business.ts
import { Request, Response } from "express";
import Business from "../models/business";
import businessSchema, { BusinessFormData } from "../schemas/business.sschema";
import { z } from "zod";

const registerBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body using Zod
    const validatedData: BusinessFormData = businessSchema.parse(req.body);

    // Check if business with the same email already exists
    const existingBusiness = await Business.findOne({ email: validatedData.email });
    if (existingBusiness) {
      res.status(400).json({ message: "Business with this email already exists" });
      return;
    }

    // Create a new business
    const newBusiness = new Business(validatedData);
    await newBusiness.save();

    res.status(201).json({ message: "Business registered successfully", data: newBusiness });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation error", errors: error.errors });
      return;
    }
    console.error("Error registering business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { registerBusiness };