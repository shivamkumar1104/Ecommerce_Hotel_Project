import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { useReducer } from 'react';

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
            default: "",

        },

        // phone number
        phone: {
            type: String,
            trim: true,
            default: "",
        },

        // account status
        isActive: {
            type: Boolean,
            default: true,
        },
        },
        {
            timestamps: true,
        }
    
);

userSchema.pre("save", async function(next){
    // Password hasn't changed
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function(){
    const user = this.toObject();

    delete user.password;
    delete user.__v;

    return user;
}



const User = mongoose.model('User', userSchema);
export default User;