import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // MongoDB Schema for User Model
  userName: {
    type: String,
    required: [true, "Provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Nextjs working on edge computing so nextjs don't know it is already created or taking reference of a schema so we need to export the model like this.
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
