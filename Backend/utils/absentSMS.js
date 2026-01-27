
// const axios = require("axios");

// const sendSMS = async ({message, mobile}) => {
//   console.log("📤 sendSMS FUNCTION CALLED");
//   console.log("📨 Message:", message);
//   console.log("🔑 API KEY:", process.env.SMS_API_KEY ? "FOUND" : "NOT FOUND");

//   try {
//     const response = await axios({
//       method: "POST",
//       url:  "https://www.fast2sms.com/v1/bulk",
//       headers: {
//         authorization: process.env.SMS_API_KEY,
//         "Content-Type": "application/json"
//       },
//       data: {
//         route: "q",
//         // sender_id: "TXTIND", 
//         message: message,
//         language: "english",
//         mobile: mobile.toString(),
//       }
//     });

//     console.log("✅ SMS SENT RESPONSE:", response.data);
//   } catch (error) {
//     console.error("❌ SMS ERROR:", error.response?.data || error.message);
//   }
// };

// module.exports = sendSMS;


const axios = require("axios");

const sendSMS = async ({ mobile, message }) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2", 
      {
        route: "q",                    
        message: message,
        numbers: mobile.toString() ,
        flash: 0, 
      },
      {
        headers: {
          authorization: process.env.SMS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ SMS SENT:", response.data);
  } catch (error) {
    console.error("❌ SMS ERROR:", error.response?.data || error.message);
  }
};

module.exports = sendSMS;
