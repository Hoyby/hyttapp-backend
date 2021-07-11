import express, { Router } from 'express';
import UserRouter from "./user.router"
import EquipmentRouter from "./equipment.router";
import TripRouter from "./trip.router";

const router = express.Router();

router.use("/users", UserRouter);
router.use("/posts", EquipmentRouter);
router.use("/comments", TripRouter);

export default router;