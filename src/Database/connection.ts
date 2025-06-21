import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "./models/userModel";

// --- FIX: LOAD THE .env FILE ---
// This line reads your .env file and adds the variables to process.env
dotenv.config();

// Now, the process.env variables below will have values
const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  dialect: process.env.DB_DIALECT as any,
  port: Number(process.env.DB_PORT), // Corrected to one underscore, double-check your .env file
  // models: [__dirname + "/../models"],
  // // This path is likely more correct
  models: [User],
});

// Chained promises for cleaner startup logic
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connection has been established successfully.");
    // Sync models only after successful connection
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("❌ Unable to connect to the database or sync:", error);
  });

export default sequelize;
