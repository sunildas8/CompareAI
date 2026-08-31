import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://compareai:sunil123@ac-10zwafq-shard-00-00.32ddggk.mongodb.net:27017,ac-10zwafq-shard-00-01.32ddggk.mongodb.net:27017,ac-10zwafq-shard-00-02.32ddggk.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority';

console.log('Testing MongoDB connection...');
console.log('URI:', uri.replace(/:[^@]*@/, ':****@')); // Hide password

const client = new MongoClient(uri, {
    ssl: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 10000,
    connectTimeoutMS: 10000,
});

(async () => {
    try {
        await client.connect();
        console.log('✓ Connected successfully!');
        
        const adminDb = client.db().admin();
        const status = await adminDb.ping();
        console.log('✓ Ping response:', status);
        
        await client.close();
        console.log('✓ Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('✗ Connection failed:', error.message);
        process.exit(1);
    }
})();
