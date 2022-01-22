import { container } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
