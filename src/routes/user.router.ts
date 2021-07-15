import express from "express";
import bcrypt from 'bcrypt';
import UserController from "../controllers/user.controller";
import { authenticateToken } from "../middleware/authorization";


const router = express.Router();

// requres auth
// FIXME
router.get("/",authenticateToken, async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); //hash password 10 rounds
  req.body.password = hashedPassword;
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new UserController();
  const response = await controller.getUser(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

export default router;