const nodemailer = require("nodemailer");
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SITE_URL } =
  process.env;
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, activationLink) {
    this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: `The activation link from website ${SITE_URL}`,
      text: "",
      html: `
          <div>
            <h2>
                To activate your account please click on the link below.
            </h2>
            <a href="${activationLink}">${activationLink}</a>
          </div>
          `,
    });
  }
}

module.exports = new MailService();
