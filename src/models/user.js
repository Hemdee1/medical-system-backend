import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  mobileNo: String,
  dateOfBirth: String,
  gender: String,
  img: String,
  state: String,
  address: String,
  height: String,
  weight: String,
  bloodGroup: String,
  allergies: [String],
});

const userModel = model("User", userSchema);

export default userModel;
