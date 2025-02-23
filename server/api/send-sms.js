import twilio from "twilio";

export default defineEventHandler(async (event) => {
  // Access runtime config (make sure to set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in nuxt.config)
  const config = useRuntimeConfig();
  const accountSid = config.TWILIO_ACCOUNT_SID;
  const authToken = config.TWILIO_AUTH_TOKEN;
  
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+13865171384",
      to: "+2347062065345"
    });

    // Return a response with the message body (or any relevant details)
    return { success: true, message: message.body };
  } catch (error) {
    // Log and return error details
    console.error("Twilio Error:", error);
    return { success: false, error: error.message };
  }
});
