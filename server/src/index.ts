import "dotenv/config";
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors({ origin: process.env.APP_URL }));
app.use(express.json());

app.get("/api/health", async (_req, res) => {
    try {
        const { rows } = await pool.query("SELECT NOW() AS time");
        res.json({ status: "ok", database: "connected", time: rows[0].time });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", database: "not connected" });
    }
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));