const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!")
// })

exports.timer = functions.https.onRequest((req, res) => {
  // check the body of the request for time interval and the roomId
  const timeStepInSeconds = req.query.timeStep
  const roomId = req.query.roomId

  // if (timeStepInSeconds == undefined) {
  //
  // } else if (roomId == undefined) {
  //
  // }

  setTimeout(() => {
    // console.log(`enter rooms/${roomId}`);
    admin.database().ref(`rooms/${roomId}`).update({onDeck: null});
    // console.log('exit');
  }, timeStepInSeconds*1000)

  res.status(200).send("Sent");
})

exports.sanitizePost = functions.database
  .ref('/post/{pushId}')
  .onWrite(event => {
    const post = event.data.val()

    if (post.sanitized) {
      return
    }

    console.log("Sanitizing ")
    post.sanitized = true
    post.title = sanitize(post.title)
    post.body = sanitize(post.body);
    return  event.data.ref.set(post)
})

function sanitize(s) {
  var sanitizedText = s
  sanitizedText = sanitizedText.replace(/\bstupid\b/ig, "wonderful")
  return sanitizedText
}
