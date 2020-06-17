const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors");
const corsHandler = cors({ origin: true });
const rp = require("request-promise");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    res.set("Access-Control-Allow-Origin", "*");

    const secret = process.env.REACT_APP_RECAPTCHA_SECRET;
    const token = req.body.value;

    rp({
      uri: "https://recaptcha.google.com/recaptcha/api/siteverify",
      method: "POST",
      formData: {
        secret: secret,
        response: token,
      },
      json: true,
    })
      .then((result) => {
        console.log("recaptcha result", result);
        if (result.success) {
          console.log("Your're are good to go human.");
          res.send({
            result: result.success,
            text: "Your're are good to go human.",
          });
        } else {
          res.send({
            result: result.success,
            text: "Recaptcha verification failed. Are you a robot?",
          });
        }
        return 0;
      })
      .catch((reason) => {
        console.log("Recaptcha request failure", reason);
        res.send({
          result: result.success,
          text: "Recaptcha request failed.",
        });
      });

    /*
    const url = `https://recaptcha.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
    console.log(url);
    axios
      .post(url)
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
