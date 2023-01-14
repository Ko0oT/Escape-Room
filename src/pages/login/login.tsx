import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

//Страница доступна только неавторизованным пользователям. Если пользователь уже авторизован и попытается попасть на страницу входа, его перекинет на главную страницу каталога квестов.
//TODO

function Login() {

  const [agreementCheckboxChecked, setAgreementCheckboxChecked] = useState(false);

  const {
    register,
    formState: {
      errors, isValid
    },
    handleSubmit,
    reset
  } = useForm({
    mode: 'all'
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>Авторизация - Escape Room</title>
      </Helmet>
      <Header/>
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
            />
            <img
              src="img/content/maniac/maniac-size-m.jpg"
              srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
              width={1366}
              height={768}
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form
              className="login-form"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">
                      E&nbsp;–&nbsp;mail
                    </label>
                    <input
                      {...register('email', {
                        required: 'Поле обязателько к заполнению',
                        pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Введите email в формате johndoe@example.ru'
                        }
                      })}
                      type="email"
                      id="email"
                      placeholder="Адрес электронной почты"
                    />
                    <div style={{height: 40}}>
                      {errors?.email && <p>{errors?.email?.message as string}</p>}
                    </div>
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">
                      Пароль
                    </label>
                    <input
                      {...register('password', {
                        required: 'Поле обязателько к заполнению',
                        pattern: {
                          value: /^(?=.*\d)(?=.*[A-Za-zА-Яа-яЁё])([^\s]){2,}$/,
                          message: 'Пароль должен содержать как минимум одну букву и цифру без пробелов'
                        }
                      })}
                      type="password"
                      id="password"
                      placeholder="Пароль"
                    />
                    <div style={{height: 40}}>
                      {errors?.password && <p>{errors?.password?.message as string}</p>}
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn--accent btn--general login-form__submit"
                  type="submit"
                  disabled={!isValid || !agreementCheckboxChecked}
                >
                  Войти
                </button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
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
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Login;
