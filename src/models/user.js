import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

// Adding passport-local-mongoose plugin to the schema
userSchema.plugin(passportLocalMongoose);

// Exporting the model
const User = mongoose.model("User", userSchema);
export default User;
