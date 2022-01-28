import { container } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
);
