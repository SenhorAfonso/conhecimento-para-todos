import { Schema, model } from "mongoose";
import { UserType } from "../../types/users/user.type";

const userSchema = new Schema({
    name:       String,
    birth:      String,
    email:      String,
    password:   String
}, {timestamps: true});

export interface UserDocument extends Document, UserType {}

export default model("User", userSchema);