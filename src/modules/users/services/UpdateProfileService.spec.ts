import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Deve ser apto a atualizar usuário', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Usuario Qualquer -- Editado',
      email: 'email_editado@qualquer.um',
    });

    expect(updatedUser.name).toBe('Usuario Qualquer -- Editado');
    expect(updatedUser.email).toBe('email_editado@qualquer.um');
  });

  it('Não deve atualizar dados de usuário não existe', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'Id_não_existe',
        name: 'Usuario Qualquer -- Editado',
        email: 'email_editado@qualquer.um',
        password: 'senha-atualizada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve é permitido informar um email em uso por outro usuário', async () => {
    await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Um Usuário para ser editado',
      email: 'para-ser@editado.ja',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Um Usuário para ser editado -- editado',
        email: 'qualqueremail@qualquer.um',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve ser apto a atualizar a senha', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: 'senha-atual',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Usuario Qualquer -- Editado',
      email: 'email_editado@qualquer.um',
      old_password: 'senha-atual',
      password: 'senha-atualizada',
    });

    expect(updatedUser.password).toBe('senha-atualizada');
  });

  it('Não deve atualizar a senha sem informar senha atual', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: 'senha-atual',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Usuario Qualquer -- Editado',
        email: 'email_editado@qualquer.um',
        password: 'senha-atualizada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve atualizar a senha se senha atual estiver errada', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: 'senha-atual',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Usuario Qualquer -- Editado',
        email: 'email_editado@qualquer.um',
        old_password: 'senha-atual-errada',
        password: 'senha-atualizada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
