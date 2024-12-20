import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import FormController from "../controllers/form.controller";

const formRouter = express.Router();

// Route: /api/form/LformId
formRouter.get("/:formId", authenticateToken, FormController.getFormById);

formRouter.get("/", authenticateToken, FormController.getForms);

//Route: /api/form/
formRouter.post("/", authenticateToken, FormController.createForm);

export default formRouter;
