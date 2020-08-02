import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('Deve retornar lista agendamentos para um prestador de um dia', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: '01-provider',
      day: 2,
      year: 2020,
      month: 5, // 5 maio e mesmo que 4 maio JS pois a comtagem do mes começa com 0.
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});
