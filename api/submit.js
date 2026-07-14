const { MongoClient } = require('mongodb');

// The MongoDB connection URI is securely loaded from environment variables
const uri = process.env.MONGODB_URI; 
let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your Mongo URI to Environment Variables as MONGODB_URI');
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the MongoClient is not constantly recreated
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { type, name, score, total, certId } = req.body;

        if (!type || !name || !certId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const mongoClient = await clientPromise;
        const db = mongoClient.db('montvale');

        // 1. Log the attempt details
        const attemptCollectionName = type === 'business' ? 'business_attempt' : 'digital_attempt';
        await db.collection(attemptCollectionName).insertOne({
            studentName: name,
            score: score,
            total: total,
            passed: true,
            certId: certId,
            timestamp: new Date()
        });

        // 2. Save the certificate record
        const courseName = type === 'business' ? 'Business Administration' : 'Digital Marketing & Analytics';
        await db.collection('certificates').insertOne({
            certId: certId,
            studentName: name,
            courseName: courseName,
            date: new Date().toLocaleDateString()
        });

        return res.status(200).json({ success: true, certId });
    } catch (error) {
        console.error('Database write error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
