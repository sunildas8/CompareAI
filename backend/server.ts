import app from './src/app.js';
import { connectToDatabase } from './src/services/mongodb.service.js';

const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
    await connectToDatabase();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});