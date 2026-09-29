require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const setupAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const username = "admin";
    const password = "Admin@12345";

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();

    console.log("Admin created successfully");
    console.log("Username:", username);
    console.log("Password:", password);

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

setupAdmin();