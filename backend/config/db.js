const { Sequelize } = require("sequelize");
require("dotenv").config();

// Set up Sequelize connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false, // Disable logging for cleaner output
});

// Test connection
sequelize.authenticate()
  .then(() => console.log("✅ Connected to the database"))
  .catch((error) => console.error("❌ Database connection error:", error));

// Sync models (optional)
sequelize.sync()
  .then(() => console.log("📌 Database & tables synced!"))
  .catch((error) => console.error("❌ Error syncing database:", error));

module.exports = sequelize;
