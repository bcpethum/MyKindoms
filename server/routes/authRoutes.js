import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
  updateAdmin,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/bypass-status", (req, res) => {
  res.json({
    success: true,
    bypassActive: process.env.DISABLE_AUTH_FOR_ADSENSE === "true",
  });
});

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", protect, getCurrentAdmin);
router.put("/update", protect, updateAdmin);

export default router;