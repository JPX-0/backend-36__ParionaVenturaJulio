import twilio from 'twilio';
import env from "./env.config.js";

const twilioClient = twilio(env.ACCOUNT_SID, env.AUTH_TOKEN);

const sendMessage = async (type, to, body) => {
  const from = env.TWILIO_PHONE;
  if(type == "whatsapp") to = `whatsapp:${to.split("(")[1].split(")").join("").split(" ").join("")}`;
  if(type == "sms") from = env.TWILIO_PHONE.split(":")[1];
  try {
    const messagePayload = { from, to, body };
    await twilioClient.messages.create(messagePayload);
  }
  catch(error) {
    console.error("ERROR: ", error);
  }
};

export default sendMessage;