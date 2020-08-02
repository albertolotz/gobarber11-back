import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailbility', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Deve retornar lista dias disponiveis em um mês do prestador', async () => {
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 2, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '01-Cliente',
      provider_id: '01-provider',
      date: new Date(2020, 4, 5, 17, 0, 0),
    });

    const availbility = await listProviderMonthAvailability.execute({
      provider_id: '01-provider',
      year: 2020,
      month: 5, // 5 maio e mesmo que 4 maio JS pois a comtagem do mes começa com 0.
    });

    expect(availbility).toEqual(
      expect.arrayContaining([
        { day: 2, available: false },
        { day: 3, available: true },
        { day: 4, available: true },
        { day: 5, available: true },
      ]),
    );
  });
});
