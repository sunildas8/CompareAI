import express from 'express';
import runGraph from './services/graph.ai.service.js'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.PORT,
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.post('/invoke', async (req, res) => {
    const { input } = req.body;
    const result = await runGraph(input);
    res.status(200).json({
        message: 'Graph AI invoked successfully',
        success: true,
        result,
    });
});

export default app;