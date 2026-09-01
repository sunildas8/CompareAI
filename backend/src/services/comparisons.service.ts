import { getDatabase } from './mongodb.service.js';

export const saveComparison = async (problem: string, result: unknown) => {
    await getDatabase().collection('comparisons').insertOne({
        problem,
        result,
        createdAt: new Date()
    });
};

export const getComparisons = async () => {
    const comparisons = await getDatabase()
        .collection('comparisons')
        .find({}, { projection: { problem: 1, result: 1, createdAt: 1 } })
        .sort({ createdAt: -1 })
        .toArray();

    return comparisons.map((comparison: any) => ({
        id: comparison._id.toString(),
        problem: comparison.problem,
        result: comparison.result,
        createdAt: comparison.createdAt
    }));
};