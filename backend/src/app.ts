import express from 'express';
import runGraph from './services/graph.ai.service.js'
import cors from 'cors';
import dotenv from 'dotenv';
import { getComparisons, saveComparison } from './services/comparisons.service.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://compare-judge-ai.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/comparisons', async (req, res) => {
    const comparisons = await getComparisons();
    res.status(200).json({ success: true, comparisons });
});

app.post('/invoke', async (req, res) => {
    const { input } = req.body;
    const result = await runGraph(input);
    await saveComparison(input, result);
    res.status(200).json({
        message: 'Graph AI invoked successfully',
        success: true,
        result,
    });
});

export default app;