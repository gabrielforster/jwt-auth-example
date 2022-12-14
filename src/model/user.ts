import mongoose, { Schema }  from "mongoose";

const UserSchema = new Schema({
  first_name: {type: String, default: null},
  last_name: {type: String, default: null},
  email: {type: String, unique: true, default: null},
  password: {type: String},
  token: {type: String}
});

export const User = mongoose.model("User", UserSchema)