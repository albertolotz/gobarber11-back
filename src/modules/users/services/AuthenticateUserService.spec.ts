import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Deve ser apto a autenticar usuário gerando token jwt', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    const authenticate = await authenticateUser.execute({
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    expect(authenticate).toHaveProperty('token');
    expect(authenticate.user).toEqual(user);
  });

  it('Não neve ser permitido autenticar se email não estiver correto', async () => {
    await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'qualqueremail@qualquer.um',
        password: 'senha_errada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não neve ser permitido autenticar se senha estiver incorreta', async () => {
    await expect(
      authenticateUser.execute({
        email: 'qualqueremail@qualquer.um',
        password: 'senha_errada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
