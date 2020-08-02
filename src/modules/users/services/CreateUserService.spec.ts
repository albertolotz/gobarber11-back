import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Deve ser apto a criar um novo usuário', async () => {
    const user = await createUser.execute({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Não neve ser permitido a cadastar email duplicado para usuários', async () => {
    await createUser.execute({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Um Usuário Qualquer',
        email: 'qualqueremail@qualquer.um',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
