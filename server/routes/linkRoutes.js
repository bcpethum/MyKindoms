import express from "express";

import {
  getLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
  trackClick,
} from "../controllers/linkController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getLinks);
router.get("/:id", getLinkById);

router.post(
  "/",
  protect,
  createLink
);

router.put(
  "/:id",
  protect,
  updateLink
);

router.delete(
  "/:id",
  protect,
  deleteLink
);

router.post(
  "/click/:id",
  trackClick
);

export default router;