import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
// import cors from "cors";
import userRoute from "./routes/user.js";
import appointmentRoute from "./routes/appointment.js";
import checkAuthenticatedUser from "./middlewares/checkAuthenticatedUser.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;

const app = express();

// middlewares
// app.use(cors({
//   origin: 'frontend link',
//   credentials: true
// }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express session
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24 * 3, //3 days
      httpOnly: true,
      secure: process.env.NODE === "production",
      sameSite: process.env.NODE === "production" ? "none" : null,
    },
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
  })
);

// routes
app.use("/api/user", userRoute);
app.use("/api/appointment", checkAuthenticatedUser, appointmentRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
