const axios = require("axios");

exports.handler = async (event, context, callback) => {
  console.log("Running recaptcha netlify function...");
  const secret = process.env.REACT_APP_RECAPTCHA_SECRET;
  const token = JSON.parse(event.body);

  try {
    const result = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result.data,
      }),
    };
  } catch {
    return {
      statusCode: 500,
    };
  }
};
