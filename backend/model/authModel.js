import mongoose, { Schema } from "mongoose";

const authSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    },
    isAdmin: { type: Boolean, default: false, required: true },
}, { timestamps: true });


const User = mongoose.model('User', authSchema);
export default User;