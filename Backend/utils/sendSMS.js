const axios = require("axios");

const sendSMS = async ({ mobile, message }) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message,
        numbers: String(mobile),
        flash: 0,
      },
      {
        headers: {
          authorization: process.env.SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ SMS SENT:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ SMS ERROR:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = sendSMS;
