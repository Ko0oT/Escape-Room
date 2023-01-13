/* eslint-disable no-console */
import { LeafletMouseEvent } from 'leaflet';
import { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import TimeInput from '../../components/time-input/time-input';
import { bookingInfo, someQuest as quest } from '../../mocks/data';
import { FormData, Location } from '../../types/types';
import { QuestDate } from './../../constants';
// import { useForm } from 'react-hook-form';
//данные берутся из 2х запросов сразу

function Booking() {
  const {id} = useParams();

  const initialFormState: FormData = {
    date: undefined,
    time: '',
    contactPerson: '',
    phone: '',
    withChildren: true,
    peopleCount: undefined,
    locationId: undefined,
    questId: Number(id)
  };

  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [agreementCheckboxChecked, setAgreementCheckboxChecked] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false); TODO доделать валидацию

  const handleTimeInputChange = ({target}: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      date: target.id as keyof typeof QuestDate,
      time: target.value,
    });
  };

  const handleFieldChange = ({target}: ChangeEvent<HTMLInputElement>): void => {
    const {name} = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectedMarkerChange = ({latlng}: LeafletMouseEvent) => {
    const checkedLocation: Location | undefined = bookingInfo.locations.find((it) => it.coords[0] === latlng.lat && it.coords[1] === latlng.lng);
    setFormData({
      ...formData,
      locationId: checkedLocation?.id,
    });
    setLocation(checkedLocation as Location);
  };

  // const onSubmit = (evt) => evt.preventDefault();
  // const { register, handleSubmit } = useForm();


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
                Вы&nbsp;выбрали: {location?.address}
              </p>
            </div>
          </div>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="booking-form"
            action="https://echo.htmlacademy.ru/"
            method="post"
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
                  type="text"
                  id="name"
                  name="contactPerson"
                  placeholder="Имя"
                  required
                  pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
                  onChange={handleFieldChange}
                  value={formData.contactPerson}
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">
                  Контактный телефон
                </label>
                <input
                  type="tel"
                  id="tel"
                  name="phone"
                  placeholder="Телефон"
                  required
                  pattern="[0-9]{10,}"
                  onChange={handleFieldChange}
                  value={formData.phone}
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">
                  Количество участников
                </label>
                <input
                  type="number"
                  id="person"
                  name="peopleCount"
                  placeholder="Количество участников"
                  required
                  onChange={handleFieldChange}
                  value={formData.peopleCount}
                />
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input
                  type="checkbox"
                  id="children"
                  name="withChildren"
                  onChange={handleFieldChange}
                  checked={formData.withChildren}
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
              disabled={!agreementCheckboxChecked}
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
