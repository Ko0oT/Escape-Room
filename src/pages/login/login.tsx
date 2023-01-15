import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { loginAction } from '../../store/api-action';
import { AuthData } from '../../types/auth-data';
import { LocationProps } from '../../types/types';

function Login() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const from = location.state?.from?.pathname || AppRoute.Root;
  const [agreementCheckboxChecked, setAgreementCheckboxChecked] = useState(false);


  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(from);
    }
  }, [authorizationStatus]);


  const {
    register,
    formState: {
      errors, isValid
    },
    handleSubmit
  } = useForm<AuthData>({
    mode: 'all'
  });

  const onSubmit = (data: AuthData) => {
    dispatch(loginAction(data));
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
                          value: /^(?=.*\d)(?=.*[A-Za-zА-Яа-яЁё])([^\s]){3,}$/,
                          message: 'Пароль должен содержать как минимум одну букву и цифру без пробелов, минимальная длина 3 символа'
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
