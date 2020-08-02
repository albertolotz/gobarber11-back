import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailbility', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Deve retornar lista horarios disponiveis em um dia do mês do prestador', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 2, 11).getTime();
    });

    const availbility = await listProviderDayAvailability.execute({
      provider_id: '01-provider',
      day: 2,
      year: 2020,
      month: 5, // 5 maio e mesmo que 4 maio JS pois a comtagem do mes começa com 0.
    });

    expect(availbility).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });
});
