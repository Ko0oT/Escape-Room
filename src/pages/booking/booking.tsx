import { LeafletMouseEvent } from 'leaflet';
import { useState, ChangeEvent, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import TimeInput from '../../components/time-input/time-input';
import { BookedQuest, BookingInfo, ExtendedQuest, FormControllableInput, FormUncontrollableInput, Location } from '../../types/types';
import { useForm } from 'react-hook-form';
import { APIRoute, AppRoute, QuestDate } from '../../constants';
import { createAPI } from '../../services/api';
import LoadingScreen from '../../components/loading-screen/loading-screen';

function Booking() {
  const {id} = useParams();
  const api = createAPI();
  const navigate = useNavigate();

  const [quest, setQuest] = useState<ExtendedQuest | null>(null);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);

  useEffect(() => {
    api.get<ExtendedQuest>(`${APIRoute.Quests}/${id as string}`)
      .then((response) => setQuest(response.data))
      .catch(() => navigate(AppRoute.NotFound));
    api.get<BookingInfo>(`${APIRoute.Quests}/${id as string}/booking`)
      .then((response) => setBookingInfo(response.data))
      .catch(() => navigate(AppRoute.NotFound));
  }, []);

  const initialFormState: FormControllableInput = {
    date: undefined,
    time: undefined,
    locationId: undefined,
    questId: Number(id),
    id: Number(id),
  };

  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [formData, setFormData] = useState<FormControllableInput>(initialFormState);
  const [agreementCheckboxChecked, setAgreementCheckboxChecked] = useState(false);

  const {
    register,
    formState: {
      errors, isValid
    },
    handleSubmit,
    reset
  } = useForm<FormUncontrollableInput>({
    mode: 'all'
  });

  const onSubmit = (data: FormUncontrollableInput) => {
    api.post<BookedQuest>(`${APIRoute.Quests}/${id as string}/booking`, {...data, ...formData})
      .then(() => reset())
      .then(() => navigate(AppRoute.MyQuests))
      .catch(() => navigate(AppRoute.NotFound));
  };

  const handleSelectedMarkerChange = ({latlng}: LeafletMouseEvent) => {
    const checkedLocation: Location | undefined = bookingInfo?.locations.find((it) => it.coords[0] === latlng.lat && it.coords[1] === latlng.lng);
    setFormData({
      ...formData,
      locationId: checkedLocation?.id,
    });
    setLocation(checkedLocation as Location);
  };

  const handleTimeInputChange = ({target}: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      date: target.id as keyof typeof QuestDate,
      time: target.value,
    });
  };

  if (quest === null || bookingInfo === null) {
    return (<LoadingScreen />);
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
      </Helmet>
      <Header/>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={quest.coverImgWebp}
            />
            <img
              src={quest.coverImg}
              width={1366}
              height={1959}
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">
              Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">
              {quest.title}
            </p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <div className="map__container">
                  <Map locations={bookingInfo.locations} handleSelectedMarkerChange={handleSelectedMarkerChange} selectedLocationId={location?.id}/>
                </div>
              </div>
              <p className="booking-map__address">
                {location === undefined ? 'Выберите локацию!' : `Вы выбрали: ${location.address}`}
              </p>
            </div>
          </div>
          <form
            className="booking-form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Сегодня</legend>
                <div className="booking-form__date-inner-wrapper">
                  {bookingInfo.slots.today.map((it) => <TimeInput date='today' data={it} key={it.time} handleTimeInputChange={handleTimeInputChange}/>)}
                </div>
              </fieldset>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Завтра</legend>
                <div className="booking-form__date-inner-wrapper">
                  {bookingInfo.slots.tomorrow.map((it) => <TimeInput date='tomorrow' data={it} key={it.time} handleTimeInputChange={handleTimeInputChange}/>)}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">
                  Ваше имя
                </label>
                <input
                  {...register('contactPerson', {
                    required: 'Поле обязателько к заполнению',
                    maxLength: {
                      value: 15,
                      message: 'Максимум 15 символов'
                    },
                    pattern: {
                      value: /^([А-Яа-яЁёA-Za-z '-]{1,})$/,
                      message: 'Допустимы только буквы и спецсимволы'
                    }
                  })}
                  type="text"
                  id="name"
                  placeholder="Имя"
                />
                <div style={{height: 40}}>
                  {errors?.contactPerson && <p>{errors?.contactPerson?.message as string}</p>}
                </div>
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">
                  Контактный телефон
                </label>
                <input
                  {...register('phone', {
                    required: 'Поле обязателько к заполнению',
                    pattern: {
                      value: /^(?:\+7|8)?9(?:\d{9})$/,
                      message: 'Введите телефон в формате 8 999 999 99 99'
                    }
                  })}
                  type="tel"
                  id="tel"
                  placeholder="Телефон"
                />
                <div style={{height: 40}}>
                  {errors?.phone && <p>{errors?.phone?.message as string}</p>}
                </div>
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">
                  Количество участников
                </label>
                <input
                  {...register('peopleCount', {
                    valueAsNumber: true,
                    required: 'Поле обязателько к заполнению',
                    min: {
                      value: quest.peopleMinMax[0],
                      message: 'Недопустимый минимум участников'
                    },
                    max: {
                      value: quest.peopleMinMax[1],
                      message: 'Недопустимый максимум участников'
                    },
                  })}
                  type="number"
                  id="person"
                  placeholder="Количество участников"
                />
                <div style={{height: 40}}>
                  {errors?.peopleCount && <p>{errors?.peopleCount?.message as string}</p>}
                </div>
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input
                  {...register('withChildren')}
                  type="checkbox"
                  id="children"
                />
                <span className="custom-checkbox__icon">
                  <svg width={20} height={17} aria-hidden="true">
                    <use xlinkHref="#icon-tick" />
                  </svg>
                </span>
                <span className="custom-checkbox__label">
                  Со&nbsp;мной будут дети
                </span>
              </label>
            </fieldset>
            <button
              className="btn btn--accent btn--cta booking-form__submit"
              type="submit"
              disabled={!isValid || !location || !formData.date || !formData.time || !agreementCheckboxChecked}
            >
              Забронировать
            </button>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
              <input
                type="checkbox"
                id="id-order-agreement"
                name="user-agreement"
                required
                checked={agreementCheckboxChecked}
                onChange={() => setAgreementCheckboxChecked(!agreementCheckboxChecked)}
              />
              <span className="custom-checkbox__icon">
                <svg width={20} height={17} aria-hidden="true">
                  <use xlinkHref="#icon-tick" />
                </svg>
              </span>
              <span className="custom-checkbox__label">
                Я&nbsp;согласен с&nbsp;
                <a className="link link--active-silver link--underlined" href="https://vk.com/volchkov_sergey" target="_blank" rel="noreferrer">
                  правилами обработки персональных данных
                </a>
                &nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Booking;
