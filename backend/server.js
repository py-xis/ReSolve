import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/db.js";
import cors from "cors";
import routerv1 from "./routes/index.js";
import morgan from "morgan";

dotenv.config();


const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "chrome-extension://fkikpjbpdjmmipngehpeppbhfbkpimjj"], // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
  );


app.use("/api/v1", routerv1);


// Global Error-Handling Middleware
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);
  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  });


const PORT = 3000;
app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
});