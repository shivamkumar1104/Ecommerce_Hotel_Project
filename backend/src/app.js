import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(helmet());

app.use(cors({
origin: process.env.LOCALHOST_URL,
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

export default app;