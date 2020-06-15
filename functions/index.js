const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors");
const corsHandler = cors({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    response.set("Access-Control-Allow-Origin", "*");
    response.send("Hello from Firebase!");
    /*
    const secret = "<server-site-key>";
    const token = request.body.value;
    console.log(request.body.value);

    axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
      )
      .then((res) => {
        console.log("thennnnn");
        return response.status(200).send({ res });
      })
      .catch((err) => {
        console.log("catchhh");
        console.log(err);
        return response.status(400).send("näääääätverk");
      });
      */
  });
});
