const functions = require('firebase-functions');



const admin = require('firebase-admin');
admin.initializeApp();

// exports.createBranch = functions.https.onRequest(async (req,res) =>{

// });

exports.addTransaction = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const transaction = req.body;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const machineRef = admin.firestore()
        .collection('branches').doc(transaction.billPaymentRef1)
        .collection('machines').doc(transaction.billPaymentRef2)
    machineRef
        .collection('transaction_logs')
        .doc(transaction.transactionId).set(transaction)
        .then(ref => {
            machineRef.update({is_available: false})
                .then(function() {
                    // Send back a message that we've succesfully written the message
                    res.json(
                        {
                            result: 
                            {
                                resCode: "00",
                                resDesc: "success",
                                transactionId: transaction.transactionId
                            }
                        });
                })
                .catch(err=> {
                    console.log('Error updating document', err);
                    // TODO : find resCode and resDesc for Error
                    res.json(
                        {
                            result: 
                            {
                                resCode: "99",
                                resDesc: "Error updating document",
                                transactionId: transaction.transactionId
                            }
                        });
                });
        })
        .catch(err=> {
            console.log('Error adding document', err);
            // TODO : find resCode and resDesc for Error
            res.json(
                {
                    result: 
                    {
                        resCode: "99",
                        resDesc: "Error adding document",
                        transactionId: transaction.transactionId
                    }
                });
        });
    
  });
exports.testCall = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.body;
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
exports.getFee = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const query = req.query;
    const fee = await admin.firestore().
                        collection('branches').doc(query.branch).
                        collection('machines').doc(query.machine).get()
                        .then(doc => {
                            if (!doc.exists) {
                              console.log('No such document!');
                              res.json(
                                {
                                    success: false,
                                    result: 
                                    {
                                        branch_id: query.branch,
                                        machine_id: query.machine,
                                        err_text: "invalid branchID or machineID"
                                    }
                                });
                            } else {
                              console.log('Document data:', doc.data());
                              res.json(
                                {
                                    success: true,
                                    result: 
                                    {
                                        branch_id: query.branch,
                                        machine_id: query.machine,
                                        fee: doc.data().fee
                                    }
                                });
                            }
                          })
                          .catch(err => {
                            console.log('Error getting document', err);
                          });
    
    res.json(
    {
        result: 
        {
            branch_id: query.branch,
            machine_id: query.machine,
        }
    });
  });