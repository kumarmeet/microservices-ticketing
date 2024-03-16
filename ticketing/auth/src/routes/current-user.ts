import { currentUser, requireAuth } from "@mssgtickets/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    return res.json({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
