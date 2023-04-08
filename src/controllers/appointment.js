import appointmentModel from "../models/appointment.js";

export const GetUserAppointments = async (req, res) => {
  const userId = req.session.userId;

  try {
    const appointments = await appointmentModel.find({ userId }).exec();

    res.status(200).json(appointments);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const GetAppointment = async (req, res) => {
  const id = req.params.id;

  try {
    const appointment = await appointmentModel.findById(id).exec();

    res.status(200).json(appointment);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const CreateAppointment = async (req, res) => {
  const userId = req.session.userId;
  const { hospital, doctor, title, date, time, status } = req.body;

  try {
    if (!hospital || !doctor || !title || !date || !time || !status) {
      return res.status(400).json({ error: "All parameters are required!" });
    }

    const appointment = await appointmentModel.create({
      userId,
      hospital,
      doctor,
      title,
      date,
      time,
      status,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const updateAppointment = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedAppointment = await appointmentModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .exec();

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const deleteAppointment = async (req, res) => {
  const id = req.params.id;

  try {
    await appointmentModel.findByIdAndDelete(id).exec();

    res.sendStatus(200);
  } catch (error) {
    res.status(401).json(error);
  }
};
