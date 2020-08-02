import { container } from 'tsyringe';

import HandlebarsMailTempleteProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTempleteProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTempleteProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
