/* eslint-disable consistent-return */


/* ********* CONFIGURE FUNCTIONS ********* */


const firebase = require('firebase');
const functions = require('firebase-functions');


const timestamp = firebase.database.ServerValue.TIMESTAMP;


/* ********* DEFINE FUNCTIONS ********* */


module.exports = {
  emoji: functions.https.onRequest((req, res) => {
    res.send(['😀', '😇', '😍', '😤', '😳', '😵'][Math.floor(Math.random() * 6)]);
  }),

  emojify: functions.database.ref('/messages/{message}/text').onWrite(event => {
    if (event.data.previous.exists() || !event.data.exists()) {
      return;
    }

    let text = event.data.val();

    text = text.replace(/8\)/gi, '😎');
    text = text.replace(/:\)|:D/gi, '😁');

    return event.data.ref.parent.update({ modified: timestamp, text });
  }),
};
