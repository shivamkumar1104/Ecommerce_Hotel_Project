import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);

    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user and explicitly select password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password matching
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/**
 * Google OAuth Sign-In / Register
 * Public Route: POST /api/auth/google
 */
export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential token is required",
      });
    }

    // Verify token with Google TokenInfo API
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );

    if (!googleRes.ok) {
      const errData = await googleRes.json().catch(() => ({}));
      return res.status(401).json({
        success: false,
        message: errData.error_description || "Invalid Google token",
      });
    }

    const payload = await googleRes.json();

    // Verify Audience matches our Google Client ID (must be in env — no hardcoded fallback)
    const expectedClientId = process.env.GOOGLE_CLIENT_ID;
    if (!expectedClientId) {
      return res.status(500).json({ success: false, message: "Google OAuth is not configured on the server." });
    }

    if (payload.aud !== expectedClientId) {
      return res.status(401).json({
        success: false,
        message: "Google token audience mismatch",
      });
    }

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google account does not provide an email address",
      });
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (user) {
      // Link googleId if not linked
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (!user.avatar && picture) {
        user.avatar = picture;
      }
      await user.save();
    } else {
      user = await User.create({
        name: name || "Google Guest",
        email: email.toLowerCase(),
        googleId,
        avatar: picture || "",
        authProvider: "google",
        role: "user",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Signed in with Google successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to authenticate with Google",
    });
  }
};

/**
 * Get current logged in user profile
 * Protected route: GET /api/auth/me
 */
export const getMe = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve user profile",
    });
  }
};

/**
 * Update current user profile
 * Protected route: PUT /api/auth/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    const user = req.user;

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};

/**
 * Admin only: Get all users
 * Protected & Authorized: GET /api/auth/admin/users
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve users",
    });
  }
};

/**
 * Admin only: Dashboard stats
 * Protected & Authorized: GET /api/auth/admin/dashboard
 */
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: "admin" });
    const guestCount = await User.countDocuments({ role: "user" });

    res.status(200).json({
      success: true,
      message: "Welcome to Admin Concierge Portal",
      stats: {
        totalUsers,
        adminCount,
        guestCount,
        timestamp: new Date().toISOString(),
      },
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve admin dashboard",
    });
  }
};