const functions = require('firebase-functions');



const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've succesfully written the message
    res.json({result: `
        "resCode": "00",
        "resDesc ": "success",
        "transactionId": "xxx",
        "confirmId" : "xxx"`});
  });
exports.testCall = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    res.json(
    {
        result: 
        {
            resCode: "00",
            resDesc: original,
            transactionId: "xxx",
            confirmId : "xxx"
        }
    });
  });