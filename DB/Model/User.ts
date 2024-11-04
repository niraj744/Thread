import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  kindeID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String },
  imageUrl: { type: String, required: true },
  bio: { type: String },
  onboarded: { type: Boolean, default: false },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      default: [],
    },
  ],
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Community",
      default: [],
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
