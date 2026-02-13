import SibApiV3Sdk from "@getbrevo/brevo";

const sendEmail = async ({ to, subject, html }) => {
  const client = SibApiV3Sdk.ApiClient.instance;
  client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    sender: {
      email: "luen2k3@gmail.com", // PHẢI là email đã verify trong Brevo
      name: "MGPost"
    },
    to: [{ email: to }],
    subject: subject,
    htmlContent: html,
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export default sendEmail;
