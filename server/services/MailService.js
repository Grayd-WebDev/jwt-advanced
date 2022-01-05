class MailService {
  async sendActivationMail(to, ActivationLink) {
    return "We have sent the Activation link to user!";
  }
}

module.exports = new MailService();
