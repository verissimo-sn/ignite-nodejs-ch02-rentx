import {
  IMailProvider,
  ISendMailData,
} from '@shared/providers/MailProvider/IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private email: any[] = [];

  async sendMail(data: ISendMailData): Promise<void> {
    const sendMail = { ...data };

    this.email.push(sendMail);
  }
}

export { MailProviderInMemory };
