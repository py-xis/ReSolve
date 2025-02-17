import admin from "firebase-admin";
import { readFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();
// Load Firebase credentials dynamically
const serviceAccount = JSON.parse(
  await readFile(new URL(process.env.FIREBASE_CONFIG_PATH, import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1]; // Extract token

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user data to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};