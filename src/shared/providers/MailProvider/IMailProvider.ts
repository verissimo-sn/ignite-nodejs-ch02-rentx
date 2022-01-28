export interface ISendMailData {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

interface IMailProvider {
  sendMail(data: ISendMailData): Promise<void>;
}

export { IMailProvider };
