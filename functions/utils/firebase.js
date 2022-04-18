// The Firebase Admin SDK to access Firestore.
const firebase = require("firebase");

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// Helper to load configurations
const dotenv = require("dotenv");
dotenv.config();

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    gcpRegion: process.env.GCP_REGION || "europe-west2",
};


module.exports = { admin, db, firebase, config };