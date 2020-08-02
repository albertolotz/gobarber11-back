import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Deve ser apto a recuperar senha utilizando email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'qualqueremail@qualquer.um',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Não Deve ser apto a enviar email para usuários sem cadastro', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'qualqueremail@qualquer.um',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve ser apto a gerar token para recuperação da senha', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'qualqueremail@qualquer.um',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
