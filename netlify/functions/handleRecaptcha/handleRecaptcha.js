const rp = require("request-promise");

exports.handler = async (event, context, callback) => {
  const secret = process.env.REACT_APP_RECAPTCHA_SECRET;
  const token = JSON.parse(event.body);

  try {
    const result = await rp({
      uri: "https://recaptcha.google.com/recaptcha/api/siteverify",
      method: "POST",
      formData: {
        secret: secret,
        response: token,
      },
      json: true,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result,
      }),
    };
  } catch {
    return {
      statusCode: 500,
    };
  }
};
