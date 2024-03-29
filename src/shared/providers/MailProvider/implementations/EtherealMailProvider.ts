import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, ISendMailData } from '../IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  async sendMail({
    to,
    subject,
    path,
    variables,
  }: ISendMailData): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'RentX <noreplay@rentx.com.br>',
      subject,
      html: templateHtml,
    });

    console.log('Message sent: %s', message);
    console.log('Provider URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
