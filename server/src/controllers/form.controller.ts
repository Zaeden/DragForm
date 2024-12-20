import { Request, Response } from "express";
import prisma from "../db/db.config";
import { formSchema } from "../validations/form.validation";
import { ZodError } from "zod";

class FormController {
  static async getFormById(req: Request, res: Response): Promise<any> {
    const { formId } = req.params;
    try {
      const form = await prisma.form.findFirst({
        where: {
          userId: req.user.id,
          id: parseInt(formId),
        },
      });

      if (!form) {
        return res.status(404).json({ message: "Form not found" });
      }

      return res.status(200).json({ form });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getForms(req: Request, res: Response): Promise<any> {
    try {
      const forms = await prisma.form.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!forms) {
        return res.status(404).json({ message: "Forms not found" });
      }

      return res.status(200).json({ message: "Forms found", forms });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async createForm(req: Request, res: Response): Promise<any> {
    try {
      const { body } = req;
      const payload = formSchema.parse(body);

      const newForm = await prisma.form.create({
        data: {
          userId: req.user.id,
          name: payload.name,
          description: payload.description,
        },
      });

      return res
        .status(201)
        .json({ message: "Form created successfully", formId: newForm.id });
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(500)
          .json({ message: error.errors.map((err) => err.message) });
      } else {
        return res.status(500).json({ message: error });
      }
    }
  }
}

export default FormController;
