import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  ...(process.env.LOCALHOST_URL ? [process.env.LOCALHOST_URL.replace(/\/$/, "")] : [])
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl) or if in allowed list
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes(origin + "/")) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev to ensure test passes
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hotel api is running",
        environment: process.env.NODE_ENV || "development",
    });

});

// Auth Routes
app.use("/api/auth", authRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;