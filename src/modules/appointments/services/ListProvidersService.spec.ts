import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProfileService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProfileService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProfileService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('Deve retornar lista de prestadores', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Dois Usuário Qualquer',
      email: 'qualqueremail@qualquer.dois',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Usuário logado',
      email: 'usuário-logado@x.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
