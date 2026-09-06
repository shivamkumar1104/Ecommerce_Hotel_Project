import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const USerSchema = new mongoose.Schema(
    {
        // name
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true, 
            minlength: [4, "Name must be atleast 4 characters long"],
            maxlength: [25, "Name should not be more than 25 charactters long"],
        },
        // email
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },
        // password
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            maxlength: [12, "Password must not be more than 12 characters"],
            select: false,
            validate: {
                validator: function(value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value);
                },
                message: "Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (@$!%*?&).",
            }
        },
        
        // User Role
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        // Profile image
        avatar:{
            type: String,
            deafu
        }

        }
    
)
const User = mongoose.model('User', UserSchema);
export default User;