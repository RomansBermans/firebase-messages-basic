

/* ********* CONFIGURE FUNCTIONS ********* */


const firebase = require('firebase');
const functions = require('firebase-functions');


module.exports = {
  emoji: functions.https.onRequest((req, res) => {
    res.send(['😀', '😇', '😍', '😤', '😳', '😵'][Math.floor(Math.random() * 6)]);
  }),

  emojify: functions.database.ref('/messages/{message}/text').onWrite(event => {
    if (event.data.previous.val() || !event.data.val()) {
      return;
    }

    const modified = firebase.database.ServerValue.TIMESTAMP;
    let text = event.data.val();

    text = text.replace(/chill|cool|8\)/gi, '😎');
    text = text.replace(/smile|:\)|:D/gi, '😁');

    return event.data.ref.parent.update({ modified, text });
  }),
};
