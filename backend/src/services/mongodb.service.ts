import dns from 'node:dns';
import { MongoClient, type Db } from 'mongodb';
import config from '../config/config.js';

let database: Db | undefined;

export const connectToDatabase = async (): Promise<Db> => {
    if (database) {
        return database;
    }

    if (!config.MONGODB_URI) {
        throw new Error('MONGODB_URI is not configured');
    }

    if (config.MONGODB_URI.startsWith('mongodb+srv://')) {
        // Use IPv4 DNS resolvers when the local IPv6 resolver rejects SRV queries.
        dns.setServers(['8.8.8.8', '1.1.1.1']);
    }

    const client = new MongoClient(config.MONGODB_URI);
    await client.connect();
    database = client.db(config.MONGODB_DB_NAME);
    await database.command({ ping: 1 });
    console.log(`Connected to MongoDB database "${config.MONGODB_DB_NAME}"`);

    return database;
};

export const getDatabase = (): Db => {
    if (!database) {
        throw new Error('MongoDB is not connected');
    }

    return database;
};