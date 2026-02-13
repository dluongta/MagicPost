import * as brevo from '@getbrevo/brevo';

const sendEmail = async ({ to, subject, html }) => {
  const apiInstance = new brevo.TransactionalEmailsApi();

  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.sender = {
    email: "luen2k3@gmail.com",
    name: "MGPost"
  };

  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export default sendEmail;
