import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('Deve ser apto a criar um novo agendamento', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'id-cliente',
      provider_id: '999999',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('999999');
  });

  it('Não deve ser permitido criar dois agendamentos no mesmo horário', async () => {
    const appointmentDate = new Date(2020, 5, 10, 16);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'id-cliente',
      provider_id: '999999',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'id-cliente',
        provider_id: '999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser permitido criar agendamentos em data passada', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 11);

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'id-cliente',
        provider_id: '999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser permitido criar agendamentos para si mesmo', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 13);

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'id-cliente',
        provider_id: 'id-cliente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser permitido criar agendamentos antes das 8h ou depois das 17h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 14).getTime();
    });

    const appointmentDateBefore8h = new Date(2020, 4, 15, 7);
    const appointmentDateAffter18h = new Date(2020, 4, 15, 18);

    await expect(
      createAppointment.execute({
        date: appointmentDateBefore8h,
        user_id: 'id-cliente_1',
        provider_id: 'id-provider_1',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.execute({
        date: appointmentDateAffter18h,
        user_id: 'id-cliente_2',
        provider_id: 'id-provider_2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
