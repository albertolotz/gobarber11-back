import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('Deve realizar upload de avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'arquivo_para_upload.png',
    });

    expect(user.avatar).toBe('arquivo_para_upload.png');
  });

  it('Não pode realizar upload de avatar se usuário não existe', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'usuario_nao_existe',
        avatarFilename: 'arquivo_para_upload.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve apagar avatar existente e alterar pelo novo', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Um Usuário Qualquer',
      email: 'qualqueremail@qualquer.um',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'arquivo_para_ser_deletado.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'novo_arquivo_para_upload.png',
    });
    expect(deleteFile).toHaveBeenCalledWith('arquivo_para_ser_deletado.png');
    expect(user.avatar).toBe('novo_arquivo_para_upload.png');
  });
});
