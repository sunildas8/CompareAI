import {config} from 'dotenv';
config();

type CONFIG = {
    readonly GOOGLE_API_KEY: string;
    readonly MISTRAL_API_KEY: string;
    readonly COHERE_API_KEY: string;
    readonly MONGODB_URI: string;
    readonly MONGODB_DB_NAME: string;
}

const app_config: CONFIG = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || '',
    COHERE_API_KEY: process.env.COHERE_API_KEY || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'compareai'
}

export default app_config;
