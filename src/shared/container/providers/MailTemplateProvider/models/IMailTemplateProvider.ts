import ITemplateVariables from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: ITemplateVariables): Promise<string>;
}
