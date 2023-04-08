import { Router } from "express";
import * as AppointmentControllers from "../controllers/appointment.js";

const appointmentRoute = Router();

appointmentRoute.get("/", AppointmentControllers.GetUserAppointments);

appointmentRoute.get("/:id", AppointmentControllers.GetAppointment);

appointmentRoute.post("/create", AppointmentControllers.CreateAppointment);

appointmentRoute.patch("/update/:id", AppointmentControllers.updateAppointment);

appointmentRoute.delete(
  "/delete/:id",
  AppointmentControllers.deleteAppointment
);

export default appointmentRoute;
