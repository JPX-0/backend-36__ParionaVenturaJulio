import twilio from 'twilio';
import env from "./env.config.js";

const twilioClient = twilio(env.ACCOUNT_SID, env.AUTH_TOKEN);

const sendMessage = async (type, phone, body) => {
  const from = env.TWILIO_PHONE;
  const to = phone.split("(")[1].split(")").join("").split(" ").join("");
  if(type == "whatsapp") {
    from = `whatsapp:${env.TWILIO_PHONE}`;
    to = `whatsapp:${phone.split("(")[1].split(")").join("").split(" ").join("")}`;
  }
  try {
    const messagePayload = { from, to, body };
    await twilioClient.messages.create(messagePayload);
  }
  catch(error) {
    console.error("ERROR: ", error);
  }
};

export default sendMessage;