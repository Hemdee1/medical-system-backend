import { Schema, Types, model } from "mongoose";

const appointmentSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const appointmentModel = model("Appointment", appointmentSchema);

export default appointmentModel;
