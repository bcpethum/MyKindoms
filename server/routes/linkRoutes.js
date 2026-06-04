import express from "express";

import {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  trackClick,
} from "../controllers/linkController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getLinks);

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