/* */


const Firebase = require('firebase-admin');
const Functions = require('firebase-functions');


/* ********* INIT ********* */


const timestamp = Firebase.database.ServerValue.TIMESTAMP;


/* ********* FUNCTIONS ********* */


module.exports = {
  emojify: Functions.database.ref('/messages/{message}/text').onCreate(event => {
    let text = event.data.val();

    text = text.replace(/8\)/gi, '😎');
    text = text.replace(/:\)|:D/gi, '😁');
    text = text.replace(/:\(/gi, '🙁');
    text = text.replace(/<3/gi, '❤️');
    text = text.replace(/\*/gi, ['😀', '😇', '😍', '😤', '😳', '😵'][Math.floor(Math.random() * 6)]);

    return event.data.ref.parent.update({ modified: timestamp, text });
  }),
};
