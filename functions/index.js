const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.myFunc = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true, myOtherField: false });
  response.send("Hello from Firebase! 🔥🔥🔥🔥🔥 ");
});
