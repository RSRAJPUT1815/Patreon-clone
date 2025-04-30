import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String

    },
    email: {
        type: String,
        required: true,
       
    },
    username: {
        type: String,
        required: true
    },
    profilpic: {
        type: String,
    },
    coverpic: {
        type: String,
    },
    emailVerified: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    razorpayid: {
      type: String,
      
    },
    razorpaysecret: {
      type: String,
      
    },
});

export default mongoose.models.User || model("User", userSchema);;