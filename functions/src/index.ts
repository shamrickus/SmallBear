// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.testkey);

const email = functions.config().gmail.email;
const pw = functions.config().gmail.password;
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pw
  },
});

let mailOptions = {
  from: 'SmallBearCoffee@gmail.com',
  cc: 'SmallBearCoffee@gmail.com',
  to: '',
  subject: '',
  html: ''
};

exports.shipTo = functions.database
  .ref('/payments/{userId}/{paymentId}/token/shipped')
  .onWrite(event => {
    const time = event.data.val();
    const uid = event.params.userId;
    const payment = event.params.paymentId;
    if (!time) return;

    return admin.database().ref(`/payments/${uid}/${payment}`)
      .once('value')
      .then(res => {
        let val = res.val();
        const opts = mailOptions;
        opts.to = val.token.email;
        opts.subject = 'Your Small Bear Coffee Order has Been Shipped!';
        opts.html = `Hello,
          Your order has been shipped and should arrive around ${time}.
          If you have any questions or concerns contact us at SmallBearCoffee@gmail.com.`;
        transport.sendMail(opts, function (err, info) {
          if (err)
            console.log(err);
          else
            console.log(info);
        });
      });
  });

exports.stripeChart = functions.database
  .ref('/payments/{userId}/{paymentId}')
  .onWrite(event => {
    const payment = event.data.val();
    const userId = event.params.userId;
    const paymentId = event.params.paymentId;

    if (!payment || payment.charge || payment.token.shipped || payment.token.charge) return;

    return admin.database()
      .ref(`/users/${userId}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      })

      .then(customer => {
        const amount = payment.amount;
        const idempotency_key = paymentId;
        const source = payment.token.id;
        const currency = 'usd';
        const charge = {amount, currency, source};

        const opts = mailOptions;
        opts.to = payment.token.email;
        opts.subject = 'Your Small Bear Coffee Order has Been Submitted for Processing!';
        opts.html = `Hello,
                  Your order ${payment.token.id.replace('tok_', '')} has been submitted for processing.
                  You will receive an email when the process is complete. 
                  If you have any questions or concerns contact us at SmallBearCoffee@gmail.com.`;
        transport.sendMail(opts, function (err, info) {
          if (err)
            console.log(err);
          else
            console.log(info);
        });
        return stripe.charges.create(charge, {idempotency_key});
      })
      .then(charge => {
        if (!charge) return;

        if (charge.paid)
          return admin.database()
            .ref(`/payments/${userId}/${paymentId}/token/charge`)
            .set(charge);
      })
      .then(result => {
        if (!result) return;

        const opts = mailOptions;
        opts.to = payment.token.email;
        opts.subject = 'You Small Bear Coffee Order has Been Processed!';
        opts.html = `Hello,
          Your order has has been processed, you will receive an email when your package is shipped to: ${payment.address.street}, ${payment.address.city} ${payment.address.state}, ${payment.address.zip}
          If you have any questions or concerns contact us at SmallBearCoffee@gmail.com.`;
        transport.sendMail(opts, function (err, info) {
          if (err)
            console.log(err);
          else
            console.log(info);
        });
      });
  });
